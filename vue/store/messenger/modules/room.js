import api from '../../../api/messenger'

const state = () => ({
  allRooms: [],
  rooms: [],
  selectedRoom: null,
  messages: [],
  room_users: [],
  selectedUser: null,
  room_name: null
})

const getters = {
  rooms: state => {
    return state.rooms
  },
    room_name:state => {
        return state.room_name
    },
    room_users: state => {
        return state.room_users
    },
    selectedUser: state => {
        return state.selectedUser
    },
  allRooms: state => {
    return state.allRooms
  },
  selectedRoom: state => {
    return state.selectedRoom
  },
  messages: state => {
    return state.messages
  },
}

const mutations = {
  selectRoom(state, room) {
    state.selectedRoom = room
  },
    renameRoom(state, room){
      state.selectedRoom = room
    },
  setMessages(state, messages) {
    state.messages = messages
  },
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setRoomUsers(state, room_users) {
    state.room_users = room_users
  },
    selectUser(state, selectedUser) {
        state.selectedUser = selectedUser
    },
  setAllRooms(state, rooms) {
    state.allRooms = rooms
  },
  setMessage(state, message) {
      state.messages.push(message)
  },
    setRoomName(state, room_name) {
        state.room_name = room_name
    },
}

const actions = {
  async selectRoom(context, room) {
    context.commit('selectRoom', room);
    const { data: messages } = await api.getMessages(room.roomId)

    context.commit('setMessages', messages.messages);
  },
    async renameRoom(context, room) {
        //context.commit('selectRoom', room);

        let room_name = context.getters.selectedRoom
        await api.renameRoom(room_name, room.room).then(response => {
        if (response.data.success == true)
        {
            location.reload()}
        else alert(response.data.text)
        }
        )

                //location.reload()})

        // context.commit('renameRoom', room_name);
    },
    async setMessage(context, message) {
      context.commit('setMessage', message)
    },
    async selectUser(context, form){
        const { data: selectedUser } = await api.removeUser(form.roomId, form.userId);
        context.commit('selectUser', selectedUser);
        },
    async setRoomUsers(context, room) {

        const { data: room_users } = await api.getUsers(room.roomId);

        context.commit('setRoomUsers', room_users);
    },

  async setRooms(context) {

    const { data: rooms } = await api.getRooms();


    //   Object.entries(notReadMessages).forEach(([roomId]) => {
    //   rooms.forEach(room => {
    //     if (room.room_id == roomId) {
    //       room = Object.assign(room, { "isNotRead": true });
    //     }
    //   })
    // });

    context.commit('setRooms', rooms.data);
    context.commit('setAllRooms', rooms.data);
  },
    searchRooms(context, keyword) {
        let rooms = [];

        rooms = context.getters.allRooms.filter((room) => {
      return room.name
        .toLowerCase()
        .includes(keyword.toLowerCase());
    });

    context.commit('setRooms', rooms);
  },

  async sendMessage(context, form) {

    let selectedRoom = context.getters.selectedRoom

    const filesArray = Array.from(form.files)

    const images = filesArray.filter(file => file.type.includes('image'))
    const files = filesArray.filter(file => file.type.includes('text') || file.type.includes('application'))

    await api.sendMessage(selectedRoom, form.message, images, files)

    context.dispatch('selectRoom', selectedRoom)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

