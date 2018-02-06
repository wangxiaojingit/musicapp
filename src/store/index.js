import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state"
import mutations from "./mutations"
import * as getters from "./getter"
import * as actions from "./actions"
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: debug ? [createLogger()] : []
  })
  export default store