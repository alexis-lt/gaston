import Vue from 'vue'
import Vuex from 'vuex'
import createGastonModule, { createAuthModule } from './gaston-store'
import createMapModule from './map-store'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      '@gaston/users': createAuthModule('users'),
      '@gaston/post': createGastonModule('post'),
      '@gaston/category': createGastonModule('category'),
      '@gaston/bounds': createMapModule(),
    },
})

export default store
