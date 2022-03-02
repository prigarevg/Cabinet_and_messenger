import Request from './request'

export default class Messenger extends Request {
    static baseUrl = "/cabinet/"

    static getRooms() {
        super.baseUrl = this.baseUrl
        return this.post('rooms-get')
    }

    static renameRoom(room, room_name) {
        super.baseUrl = this.baseUrl
        return this.post('renameRoom', {
            'room': room,
            'name': room_name
        })
    }

    static getUser() {
        super.baseUrl = this.baseUrl
        return this.get('getUser')
    }

    static getUsers(roomId) {
        super.baseUrl = this.baseUrl
        return this.post('get-users-room', {
            'room_id': roomId
        })
    }

    static removeUser(roomId, userId) {
        super.baseUrl = this.baseUrl
        return this.post('remove-user-from-room', {
            'room_id': roomId,
            'user_id': userId
        })
    }

    static getMessages(roomId) {
        super.baseUrl = this.baseUrl
        return this.post('messages-get', {
            'room_id': roomId
        })
    }

    // 'room_id' => $request->get('room_id'),
    // 'to_user_id' => $request->get('to_user_id'),
    // 'message' => $request->get('message'),
    // 'images' => $request->file('images'),
    // 'files' => $request->file('files'),
    static sendMessage(room, message, images, files) {
        super.baseUrl = this.baseUrl
        let formData = new FormData();

        images.forEach(image => {
            formData.append('images[]', image)
        });
        files.forEach(file => {
            formData.append('files[]', file)
        });

        formData.append('room_id', room.roomId)
        formData.append('message', message)

        if (room.type == "default") {
            formData.append('to_user_id', room.to_user_id)
        }
        return this.post('message-sent', formData)
    }

    static getMessagesNotRead() {
        super.baseUrl = this.baseUrl
        return this.post('messages-no-read')
    }
}
