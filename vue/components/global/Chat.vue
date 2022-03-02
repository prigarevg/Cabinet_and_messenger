<template>
  <div>
    <div class="chat" v-if="room">
      <chat-header :room="room" />
      <chat-body />
      <chat-footer />
    </div>
    <div v-else class="empty">
      <div>
        <i>
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-speak"></use>
          </svg>
        </i>
        <span>Пожалуйста, выберите диалог</span>
      </div>
    </div>
  </div>
</template>
<script>
import ChatHeader from "./ChatHeader.vue";
import ChatBody from "./ChatBody.vue";
import ChatFooter from "./ChatFooter.vue";
export default {
  name: "Chat",
  components: { ChatHeader, ChatBody, ChatFooter },
  props: {
    room: Object,
  },
  data: () => {
    return {};
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.chat {
}
.empty {
  display: grid;
  place-items: center;
  height: 100%;
  div {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    i {
      svg {
        width: 10rem;
        height: 10rem;
      }
    }
    span {
      margin-top: 2rem;
      font-weight: normal;
      font-size: var(--text-18);
      line-height: 114.5%;
    }
  }
}
</style>
