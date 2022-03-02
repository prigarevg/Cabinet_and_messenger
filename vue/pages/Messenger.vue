<template>
    <div class="messenger" >
        <room-list class="messenger__rooms"/>
        <chat class="messenger__chat" :room="room"/>
    </div>
</template>
<script>

import RoomList from "../components/messenger/RoomList.vue";
import Chat from "../components/global/Chat.vue";

import store from "../store/messenger";

export default {
    el: "#messenger-vue",
    store,
    components: {RoomList, Chat},
    computed: {
        room: {
            get: function () {
                return this.$store.getters.selectedRoom;
            },
        },
    },
    methods: {
        listenRoom: function (room_id) {
            Echo.join('chat-room.' + room_id)
                .listen('MessagePosted', (e) => {

                    if (e.system.message == 'remove_user') {
                        location.reload();
                    }

                    var audio = new Audio();
                    audio.src = '/sounds/new_message_chat.mp3';
                    audio.autoplay = true;

                    var images = e.user.images;
                    if (images == null) {
                        images = this.defaultImage;
                    }
                    let attachment_images = e.message.attachment_image


                    for( let i = 0; i < e.message.attachment_image.length; i+=1 ){
                        attachment_images[i] = {
                                attachment: e.message.attachment_image[i].attachment,
                                ext: e.message.attachment_image[i].ext,
                                id: e.message.attachment_image[i].id,
                                message_id: e.message.attachment_image[i].message_id,
                                name: e.message.attachment_image[i].name,
                                room_id: e.message.attachment_image[i].room_id,
                                type: e.message.attachment_image[i].type,
                        }
                    }
                    let attachment_files = e.message.attachment_file


                    for( let i = 0; i < e.message.attachment_file.length; i+=1 ){
                        attachment_files[i] = {
                                attachment: e.message.attachment_file[i].attachment,
                                ext: e.message.attachment_file[i].ext,
                                id: e.message.attachment_file[i].id,
                                message_id: e.message.attachment_file[i].message_id,
                                name: e.message.attachment_file[i].name,
                                room_id: e.message.attachment_file[i].room_id,
                                type: e.message.attachment_file[i].type,
                        }
                    }

                    images = this.imageCache + images;
                    store.dispatch('setMessage', {
                        "authUser": e.message.authUser,
                        isDialog: e.message.isDialog,
                        isEditDialog:e.message.isEditDialog,
                        isEditTask:e.message.isEditTask,
                        isRevision:e.message.isRevision,
                        isTask:e.message.isTask,
                        task:e.message.task,
                        task_id:e.message.task_id,
                        time:e.message.updated_at,
                        type:e.message.type,
                        user_id:e.message.user_id,
                        "text":e.message.text,
                        "author":{
                            id: e.user.id,
                            images: images,
                            name: e.user.name,
                            email: e.user.email,
                        },
                        "attachment_image":attachment_images,
                        "attachment_file":attachment_files,
                    })

                })
        },
        clearRename(){
            let input = document.getElementById('input')
            let span = document.getElementById('span')
            //document.getElementById('messenger__rooms')

                input.classList.remove('active');
                span.classList.remove('active');

            // let element = document.getElementsByClassName('messenger__rooms');


        },
    }
};
</script>

<style lang="scss" scoped>
.messenger {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 1rem;

    &__rooms {
        box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);
        border-radius: 0.5rem;
        background-color: var(--ct-white);
    }

    &__chat {
        box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);
        border-radius: 0.5rem;
        background-color: var(--ct-white);
    }
}

@media (min-width: 1024px) and (max-width: 1440px) {
    .messenger {
        grid-template-rows: 50% 50%;
        //grid-template-columns: max-content 1fr; убери

        &__rooms{
            grid-area: 1/1/1/1;
            width: 68vw;
        }
        &__chat{
            grid-area: 2/1/2/1;
            width: 68vw;
        }
    }
}
@media (min-width: 360px) {

}

@media (min-width: 768px) and (max-width: 1023px) {
    .messenger {
        grid-template-rows: 50% 50%;
        //grid-template-columns: max-content 1fr; убери

        &__rooms{
            grid-area: 1/1/1/1;
            width: 54vw;
        }
        &__chat{
            grid-area: 2/1/2/1;
            width: 54vw;
        }
    }
}

@media (max-width: 767px) {
    .messenger {
        grid-template-rows: 50% 50%;
        //grid-template-columns: max-content 1fr; убери

        &__rooms{
            grid-area: 1/1/1/1;
            width: 98vw;
        }
        &__chat{
            grid-area: 2/1/2/1;
            width: 98vw;
        }
    }
}
</style>


