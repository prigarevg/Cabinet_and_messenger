import api from '../../../api/cardIndexTask'

const state = () => ({

  tasks: [],
})

const getters = {

  tasks: state => {
    return state.tasks
  }
}

const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  setTask(state, task) {
    state.tasks.push(task)
  },
  updateTask(state, task) {
    const index = state.tasks.findIndex(item => item.id == task.id)
    state.tasks[index] = task
  },
  deleteTask(state, task) {
    const index = state.tasks.findIndex(item => item.id == task.id)
    state.tasks.splice(index, 1);
  },
  //Костыль для vue cal
  addStartEndTask(state) {
    state.tasks.forEach(task => {
      let date = new Date(task.date + ',' + task.time);

      task.start = `${task.date} ${date.getHours()}:00`

      task.end = `${task.date} ${date.getHours() + 1}:00`

      task.draggable = true
    });
  },
}

const actions = {
  async setTasks(context, tasks) {
    if (tasks) {
      context.commit('setTasks', tasks)
    } else {
      const { data } = await api.index()
      context.commit('setTasks', data.data)
    }

    context.commit('addStartEndTask')
  },

  async addTask(context, task) {
    const { data } = await api.store(task)
    context.commit('setTask', data.data)
    context.commit('addStartEndTask')
  },
  async updateTask(context, task) {

    const { data } = await api.update(task)
    context.commit('updateTask', data.data)
    context.commit('addStartEndTask')
  },
  async destroyTask(context, task) {
    await api.destroy(task)
    context.commit('deleteTask', task)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}