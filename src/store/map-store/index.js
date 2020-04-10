export default function createMapModule () {
    const state = {
      bounds: {}
    }
    
    const mutations = {
        UPDATE_BOUNDS: (state, bounds) => {
            state.bounds = bounds
        },
    }

    const getters = {
        getQuery (state) {
            return {
                lng: {
                  $gte: state.bounds.sw.lng,
                  $lte: state.bounds.ne.lng,
                },
                lat: {
                  $gte: state.bounds.sw.lat,
                  $lte: state.bounds.ne.lat,
                }
            }
        },
    }

    const actions = {
        async update (store, data) {
            const bounds = {
                sw: {
                    lng: data._sw.lng,
                    lat: data._sw.lat,
                },
                ne: {
                    lng: data._ne.lng,
                    lat: data._ne.lat,
                  }
            }
            try {
                await store.commit('UPDATE_BOUNDS', bounds)
            } catch (error) {
                return Promise.reject(error)
            }
        },
    }
  
    return {
      namespaced: true,
      state,
      mutations,
      getters,
      actions,
    }
  }
  