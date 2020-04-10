import GastonClient from '../../controllers/gaston-api';
import sift from 'sift'
import isNumber from 'lodash/isNumber'
import createUsersModule from './users'

export function createAuthModule (serviceUrl) {
  const baseModule = createGastonModule(serviceUrl)

  return createUsersModule(baseModule)
}

export default function createGastonModule (serviceUrl) {
  const state = {
    loading: false,
    items: []
  }
  
  const mutations = {
    ADD_ITEM: (state, item) => {
      state.items.push(item)
    },
    PATCH_ITEM: (state, item) => {
      const oldItemIndex = state.items.findIndex(function (itemToVerif) {
        return itemToVerif.id === item.id
      })
      state.items.splice(oldItemIndex, 1, item)
    },
    REMOVE_ITEM: (state, item) => {
      const ItemToRemoveIndex = state.items.findIndex(function (itemToVerif) {
        return itemToVerif.id === item.id
      })
      state.items.splice(ItemToRemoveIndex, 1)
    },
  }

  const getters = {
    get (state) {
      return function (id) {
        return state.items.find(item => {
          return item.id == id
        })
      }
    },

    find (state) {
      return function (params) {
        let query = Object.assign({}, params.query || {})
        let limit = 25
        let skip = 0

        if (isNumber(query.$limit)) {
          limit = query.$limit
          delete query.$limit
        }

        if (isNumber(query.$skip)) {
          skip = query.$skip
          delete query.$skip
        }

        return state.items
          .filter(sift(query))
          .slice(skip, skip + limit)
      }
    },
  }
  
  const actions = {
    async create (store, context) {
      const { data, params = {} } = context
      try {
          const item = await GastonClient.service(serviceUrl).create(data, params)
          store.commit('ADD_ITEM', item)
          return item
      } catch (error) {
          return Promise.reject(error)
      }
    },

    async get (store, context) {
      const { id, params = {} } = context
      try {
          const item = await GastonClient.service(serviceUrl).get(id, params)
          let existingItem = false
            for (let i = 0; i < store.state.items.length; i++) {
              if (item.id === store.state.items[i].id) {
                existingItem = true
              }
            }
            if (!existingItem) {
              store.commit('ADD_ITEM', item)
            }
          return item
      } catch (error) {
          return Promise.reject(error)
      }
    },

    async find (store, params) {
      try {
          const response = await GastonClient.service(serviceUrl).find(params)
          for (let a = 0; a < response.data.length; a++) {
            const item = response.data[a]
            let existingItem = false
            for (let b = 0; b < store.state.items.length; b++) {
              if (item.id === store.state.items[b].id) {
                existingItem = true
              }
            }
            if (!existingItem) {
              store.commit('ADD_ITEM', item)
            }
          }
          return response
      } catch (error) {
          return Promise.reject(error)
      }
    },

    async patch (store, context) {
      const { id, data, params = {} } = context
      try {
          const item = await GastonClient.service(serviceUrl).patch(id, data, params)
          let existingItem = false
            for (let i = 0; i < store.state.items.length; i++) {
              if (item.id === store.state.items[i].id) {
                existingItem = true
              }
            }
            if (existingItem) {
              store.commit('PATCH_ITEM', item)
            } else {
              store.commit('ADD_ITEM', item)
            }
          return item
      } catch (error) {
          return Promise.reject(error)
      }
    },

    async remove (store, context) {
      const { id, params = {} } = context
      try {
          const item = await GastonClient.service(serviceUrl).remove(id, params)
          let existingItem = false
          for (let i = 0; i < store.state.items.length; i++) {
            if (item.id === store.state.items[i].id) {
              existingItem = true
            }
          }
          if (existingItem) {
            store.commit('REMOVE_ITEM', item)
          }
          return item
      } catch (error) {
          return Promise.reject(error)
      }
    },

  }

  return {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  }
}
