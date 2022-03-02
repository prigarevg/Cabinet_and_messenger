<template>
  <div class="chat__header" >
    <div class="chat__avatar">
      <img
        :src="room.image"
        alt="logo"
        onerror="this.src = '/dist/images/no-avatar.jpg'"
      />
    </div>
    <div class="chat__name" >
        <div class="room__name">
            <span id="span">{{ room.name }}</span>
            <input id="input" :placeholder="room.name.length>=17? [[room.name.substring(0, 17) + '...']] : [[room.name]]" v-model="inputValue" v-on:keyup.enter="setRoomName(room)">
<!--            <span id="span" v-if="!hideHeader||tempRoom!=room">{{ room.name }}</span>-->
<!--            <input id="input" :placeholder="room.name.length>=17? [[room.name.substring(0, 17) + '...']] : [[room.name]]" v-model="inputValue" v-if="hideHeader&&(tempRoom==room)" v-on:keyup.enter="setRoomName(room)">-->
<!--                        <span id="span" v-if="!hideHeader">{{ room.name }}</span>-->
<!--                        <input id="input" :placeholder="room.name.length>=17? [[room.name.substring(0, 17) + '...']] : [[room.name]]" v-model="inputValue" v-if="hideHeader" v-on:keyup.enter="setRoomName(room)">-->
                    </div>

                    <div id="edit" class="room__edit" @click="renameRoom()">
                            <svg-button
                                icon="pencil"
                                width="2rem"
                                height="2rem"
                                color="var(--ct-blue)"
                                margin="1rem"
                            />
                        </div>



                </div>
            <!--    <div class="chat__online">-->
<!--      <span>был в сети 5 часов назад</span>-->
<!--    </div>-->
    <div class="chat__more" @click="share.room=room">
        <svg-button class="svgTemplate"
                    icon="owner"
                    width="2rem"
                    height="2rem"
                    bccolor="var(--ct-blue-01)"
                    color="var(--ct-blue)"
                    margin="1rem"
        />
    </div>
      <card-share
          v-if="share.room"
          :value="share.room"
          :user="users.data"
          :room="room"
          @close="share.room = false"
          @click="share.room = false"
      >
      </card-share>
  </div>
</template>
<script>
import CardShare from "../cardIndexes/CardShare";
import Room from "../messenger/Room";
import SvgButton from "../global/SvgButton";
export default {
  name: "ChatHeader",
    props: {
        room: Object,
    },
  components: { CardShare, SvgButton },
  data: () => {
    return {
        inputValue: '',
        files: false,
        tempRoom: null,
        hideHeader:false,
        share: {
            ownerId: null,
            userId: null,
            room: false,
        }
    };
  },
  mounted() {},
  computed: {
      users: {
          get: function () {
              return this.$store.getters.room_users;
          },
      }
  },

  methods: {
      showFiles(){
          if(this.files === false){
              this.files = true
          } else {
              this.files = false
          }
      },
      renameRoom() {
          this.hideHeader = !this.hideHeader;
          // if (this.tempRoom==null)
          // {
          //     this.tempRoom=this.room
          // }
          let input = document.getElementById('input')
          let span = document.getElementById('span')


              input.classList.toggle('active');
              span.classList.toggle('active');

      },

       setRoomName() {

           this.$store.dispatch("renameRoom", {
               room: this.inputValue

           })
       }}
};
</script>

<style lang="scss" scoped>
.room{
    &__name{
        display: block;
        grid-area: 1/1/1/1;
        align-self: center;
        span {
            display: block;
            &.active{
                display: none;
            }
        }
        input {
            display: none;
            &.active{
                display: block;
            }
        }
    }
    &__edit{
        grid-area: 1/2/1/2;
    }
    &__input{
        display: block;
    }
}
.chat__header {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
  column-gap: 0.5rem;

  padding: 1.5rem;
  border-bottom: 0.1rem solid var(--ct-dark-02);
    .svgTemplate{
        width: min-content;
        height: 40px;
        border-radius: 50%;
        grid-area: 1/1/1/1;
    }
  .chat {
    &__avatar {
      grid-area: 1/1/3/2;
      width: 4rem;
      height: 4rem;
        img{
            border-radius: 50%;
        }
    }
    &__name {
      grid-area: 1/2/2/3;
      justify-self: start;
      color: var(--ct-blue);
      display: grid;
      font-weight: bold;
      font-size: var(--text-18);
      line-height: 2.2rem;
    }
    &__online {
      grid-area: 2/2/3/3;
      justify-self: start;
      color: var(--ct-dark-07);
      font-weight: normal;
      font-size: var(--text-14);
      line-height: 1.6rem;
    }

    &__more {
      grid-area: 1/3/3/4;
      justify-self: end;
      cursor: pointer;
      svg {
        width: 1.8rem;
        height: 1.8rem;
        fill: var(--ct-dark-07);
        transform: rotate(90deg);
      }
    }
  }
}
</style>
