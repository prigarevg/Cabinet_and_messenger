import Vuex from 'vuex'
import card from "./modules/card"
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    card,
    task
  },
})