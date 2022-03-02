<template>
  <div class="rooms">
    <div class="rooms__search">
      <svg>
        <use xlink:href="/dist/images/icons.svg#icon-loupe"></use>
      </svg>
      <input
        type="text"
        v-model="keyword"
        placeholder="Поиск"
        @input="searchRooms(keyword)"
      />
    </div>
    <div class="rooms__list" @click="clearRename()">
      <room v-for="room in rooms" :key="room.room_id" :room="room" />
    </div>
  </div>
</template>
<script>
import Room from "./Room.vue";
export default {
  name: "RoomList",
  components: { Room },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    rooms: {
      get: function () {
        return this.$store.getters.rooms;
      },
    },
  },
  mounted() {
    this.$store.dispatch("setRooms");
  },
  methods: {
    searchRooms(keyword) {
      this.$store.dispatch("searchRooms", keyword);
    },
      clearRename(){
          let input = document.getElementById('input')
          let span = document.getElementById('span')
          //document.getElementById('messenger__rooms')

          input.classList.remove('active');
          span.classList.remove('active');

          // let element = document.getElementsByClassName('messenger__rooms');


      },
  },
};
</script>
<style lang="scss" scoped>
.rooms {
  &__list {
    display: flex;
    flex-flow: column nowrap;
    height: 64.4rem;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__search {
    margin: 1.5rem;

    border: 0.1rem solid var(--ct-dark-02);
    border-radius: 0.5rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    svg {
      margin: 1rem;
      width: 2rem;
      height: 2rem;
      fill: var(--ct-dark-02);
    }
    input {
      width: 100%;
      height: 100%;
      font-weight: 300;
      font-size: var(--text-16);
      line-height: 1.8rem;
      border: none;
      outline: none;

      ::placeholder {
        color: var(--ct-dark-02);
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .rooms {
    &__list {
    }

    &__search {
    }
  }
}

@media (max-width: 767px) {
  .rooms {
    &__search {
    }
  }
}
</style>
