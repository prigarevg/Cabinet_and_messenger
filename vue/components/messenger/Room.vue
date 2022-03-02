<template>
    <div :class="'room-'+ room.roomId +' rooms-div'">
        <div
            class="dialog"
            transform="rotate(90deg)"
        >
            <div class="dialog__body"
                 :data-room="room.roomId"
                 :class="room.isNotRead ? 'notRead' : ''"
                 @click="roomSelect(room)">
                <div class="dialog__avatar">
                    <img
                        :src="room.image"
                        alt="logo"
                        onerror="this.src = '/dist/images/no-avatar.jpg'"
                    />
                </div>
                <div class="dialog__name">
                    <span>{{ room.name }}</span>
                </div>
                <div class="dialog__text">
                    <span>{{ room.lastMessage }}</span>
                </div>
            </div>
            <div class="item_add"
                 @click="addUserRoom(room.roomId)">
                <svg-button
                    class="item_add"
                    icon="owner"
                    width="2rem"
                    height="2rem"
                    color="var(--ct-blue)"
                />
            </div>
<!--            <div v-if="popup" class = "room_popup"-->
<!--                 @close=" popup = false"-->
<!--                 @click=" popup = false"-->
<!--                 @mouseleave="popup = false">-->
<!--                [EQ-->
<!--            </div>-->
        </div>
    </div>
</template>
<script>
import SvgButton from "../global/SvgButton";
import Card from "../cardIndexes/Card";
export default {
    name: "Room",
    props: ["room"],
    data: () => {
        return {
            dialog: Object,
            popup: false
        };
    },
    mounted() {
        this.dialog = this.room;
        this.$parent.$parent.$options.methods.listenRoom(this.room.roomId);
    },
    components: {
        SvgButton,
    },
    methods: {
        roomSelect(room) {
            this.$store.dispatch("selectRoom", room);
            this.$store.dispatch("setRoomUsers", room);
        },
        addUserRoom(user_id) {
            // axios.post('/ajax', {
            //     'type': 'add_to_room',
            //     'room_id': room_id,
            //     'user_id': user_id
            // }).then( response => {
            //     if(response.data.success == true){
            //         location.reload()
            //     }
            // })
            console.log(user_id)
        }
    },
};
</script>
<style lang="scss" scoped>
.room_popup{
    width: 150px;
    height: 150px;
    background-color: white;
    position: absolute;
}
.dialog {
    display: grid;
    grid-template: repeat(2, max-content) / repeat(2, max-content);
    column-gap: 1rem;
    align-items: center;
    padding: 1rem 1.5rem;
    cursor: pointer;
    .item_add{
        visibility: hidden;
        grid-area: 1/3/1/3;
    }
    &:hover {
        background-color: var(--ct-blue-01);
        .item_add {
            visibility: visible;
        }
    }

    &__body {
        display: grid;
        align-items: center;
        column-gap: 1rem;
    }
    &__avatar {
        grid-area: 1/1/3/2;
        width: 5rem;
        height: 5rem;
        img{
            border-radius: 50%;
        }
    }

    &__name {
        grid-area: 1/2/2/3;
        font-weight: bold;
        font-size: var(--text-18);
        line-height: 2.2rem;
        max-width: 32.2rem;
        color: var(--ct-blue);
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__text {
        grid-area: 2/2/3/3;
        font-weight: 400;
        font-size: var(--text-14);
        line-height: 1.7rem;

        overflow: hidden;
        text-overflow: ellipsis;
    }

    &.notRead {
        position: relative;

        .dialog {
            &__text {
                width: 95%;
                font-weight: 600;
                font-size: var(--text-14);
                line-height: 1.7rem;
            }

            &__name {
                width: 87vw;
            }
        }

        &::after {
            content: "";
            position: absolute;
            top: 25%;
            right: 5%;
            width: 0.7rem;
            height: 0.7rem;
            background-color: var(--ct-green);
            border-radius: 50%;
        }
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .dialog {
        &__avatar {
        }

        &__name {
        }

        &__text {
        }
    }
}

@media (max-width: 767px) {
    .dialog {
        padding: 1rem 1.5rem 1rem 0;
        &__avatar {
        }

        &__name {
        }

        &__text {
        }
    }
}
</style>
