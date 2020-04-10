import GastonClient from '../../controllers/gaston-api'

export default function createAuthModule (baseModule) {
  const state = {
    ...baseModule.state,
    user: null,
  }
  const mutations = {
    ...baseModule.mutations,
    ADD_USER: (state, user) => {
      state.user = user
    },
    PATCH_USER: (state, user) => {
      state.user = user
    },
    REMOVE_USER: (state) => {
      state.user = null
    },
  }

  const actions = {
    ...baseModule.actions,
    async authenticate (store, context = {}) {
      try {
        const user = await GastonClient.authenticate(context.email, context.password)
        store.commit('ADD_USER', user)
      } catch (error) {
        return Promise.reject(error)
      } 

      return store.state.user
    },

    async logout (store) {
      if (store.state.user) {
        try {
          await GastonClient.app.logout()
          store.commit('REMOVE_USER')
          this.$router.push({ name: 'Login' })
        } catch (error) {
          return Promise.reject(error)
        } 
      }
    }
  }

  
  return {
    ...baseModule,
    state,
    mutations,
    actions,
  }
}