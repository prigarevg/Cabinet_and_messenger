import api from '../../../api/cardIndexes'
import userApi from '../../../api/user'

const state = () => ({
  user: null,
  users: [],
  card: null,
  cards: [],
  selected_card: null,
})

const getters = {
  user: state => {
    return state.user
  },
  users: state => {
    return state.users
  },
  cards: state => {
    return state.cards
  },
  card: state => {
    return state.card
  },
  selected_card: state => {
    return state.selected_card
  },
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setUsers(state, users) {
    state.users = users
  },
  setCard(state, card) {
    state.card = card
  },
  setCards(state, cards) {
    state.cards = cards
  },
  setSelectedCard(state, selected_card) {
    state.selected_card = selected_card
  },
  addCard(state, card) {
    state.cards.push(card)
  },
  updateCard(state, card) {
    const index = state.cards.findIndex(item => item.id == card.id)
    state.cards.splice(index, 1, card)
  },
  deleteCard(state, card) {
    const index = state.cards.findIndex(item => item.id == card.id)
    state.cards.splice(index, 1);
  }
}

const actions = {
  async setUser(context) {
    const { data: user } = await userApi.me()
    context.commit('setUser', user)
  },
  async setUsers(context) {
    const { data: users } = await userApi.users()
    context.commit('setUsers', users)
  },

  async setCard(context, id) {
    const { data: card } = await api.show(id)
    context.commit('setCard', card.data)
  },

  async setCards(context) {
    const { data: cards } = await api.index()

    context.commit('setCards', cards.data)
  },
  async setSelectedCard(context, id) {
    const { data: selected_card } = await api.show(id)
    context.commit('setSelectedCard', selected_card.data)
  },

  async addCard(context, card) {
    card.user_id = context.getters.user.id
    const { data } = await api.store(card)
    context.commit('addCard', data.data)
  },
  async updateCard(context, card) {

    const { data } = await api.update(card)
    context.commit('updateCard', data.data)

  },
  async destroyCard(context, card) {

    await api.destroy(card)
    context.commit('deleteCard', card)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
