<template>
  <div class="chat__body" ref="messages">
    <div v-if="this.files == false" class="chat__messages">
      <div
        v-for="message in messages"
        :key="message.id"
        class="chat__message"
        :class="message.author.id == message.authUser ? 'own' : ''"
      >
          <div class="chat__message__text"><b>{{ message.author.name }}</b>:<br>{{ message.text }}</div>
        <div
          v-if="message.attachment_image.length"
          class="chat__message__images"
        >
          <div
            v-for="image in message.attachment_image"
            :key="image.id"
            class="chat__message__image"
            ref="images"
          >
            <img @click="showImg" :src="image.attachment" />
          </div>
        </div>
        <div v-if="message.attachment_file.length" class="chat__message__files">
          <div
            v-for="file in message.attachment_file"
            :key="file.id"
            class="chat__message__file"
          >
            <a :href="file.attachment" target="_blank"
              >Файл-{{ file.id }} скачать</a
            >
          </div>
        </div>
        <div class="chat__message__time">{{ message.time }}</div>
        <div class="chat__message__status"></div>
      </div>
    </div>
    <card-files v-if="this.files == true"/>

  </div>
</template>
<script>
import CardFiles from "../cardIndexes/CardFiles";
export default {
  name: "ChatBody",
  components: {CardFiles},
  props: [],
  data: () => {
    return {
      files: false
    };
  },
  updated() {
    this.scroolDown();
  },
  computed: {
    messages: {
      get: function () {
        return this.$store.getters.messages;
      },
    },
  },

  methods: {
    scroolDown() {
      const el = this.$refs.messages;
      el.scrollTop = el.scrollHeight;
    },
    showImg({ target: element }) {
      this.$refs.images.forEach(
        (el) => el.src == element.src ?? el.classList.remove("show")
      );
      element.parentElement.classList.toggle("show");
    },
  },
};
</script>

<style lang="scss" scoped>
.chat__body {
  height: 56.5rem;
  overflow-y: scroll;
  padding: 1.5rem;
  &::-webkit-scrollbar {
    display: none;
  }

  .chat {
    &__messages {
      display: grid;
      grid-template: max-content / 1fr;
      grid-gap: 1.5rem;
    }

    &__message {
      justify-self: start;
      display: grid;
      grid-template: repeat(2, max-content) / 1fr max-content;
      padding: 2rem;
      padding-bottom: 0.5rem;
      max-width: 90%;
      height: max-content;

      background: var(--ct-gray);
      border-radius: 0.5rem;

      &__text {
        grid-area: 1/1/2/3;
        font-weight: normal;
        font-size: var(--text-18);
        line-height: 2.6rem;
        overflow-wrap: break-word;
        max-width: 100%;
      }
      &__images {
        grid-area: 2/1/3/3;
        display: flex;
        flex-flow: row wrap;
      }

      &__image {
        cursor: pointer;
        margin: 0.25rem;
        max-height: 7rem;
        overflow: hidden;
        img {
          max-width: 7rem;
          height: auto;
        }

        &.show {
          background-color: var(--ct-dark-02);

          position: fixed;
          z-index: 100;
          top: 0;
          left: 0;

          display: grid;
          place-items: center;

          min-width: 100%;
          min-height: 100%;

          img {
            border: 1rem solid var(--ct-white);
            border-radius: 0.5rem;
              position: absolute;
              height: 90%;
            //width: max-content;
            //height: max-content;
            max-width: max-content;
          }
        }
      }
      &__files {
        grid-area: 3/1/4/3;
        justify-self: end;
        display: flex;
        flex-flow: column nowrap;

        a {
          color: var(--ct-green);
          font-weight: normal;
          font-size: var(--text-18);
          line-height: 2.6rem;
        }
      }
      &__time {
        grid-area: 4/1/5/2;
        justify-self: end;
        font-weight: normal;
        font-size: var(--text-12);
        line-height: 2rem;
        color: var(--ct-dark-05);
      }
      &__status {
        grid-area: 4/2/5/3;
        display: none;
      }

      &.own {
        justify-self: end;
        background-color: var(--ct-blue-01);
        // .chat__message__status {
        //   display: block;
        // }
      }
    }
  }
}
</style>
