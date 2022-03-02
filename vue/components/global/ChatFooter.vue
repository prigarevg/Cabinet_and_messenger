<template>
  <div class="chat__footer">
    <div class="chat__file">
      <i class="chat__file__icon">
        <svg>
          <use xlink:href="/dist/images/icons.svg#icon-paper-clip"></use>
        </svg>
      </i>
      <label class="chat__file__input">
        <div class="chat__file__input__list">
          <div v-for="(file, index) in files" :key="index">
            <span>{{ file.name }}</span>
            <i @click.prevent="files.splice(index, 1)">
              <svg>
                <use xlink:href="/dist/images/icons.svg#icon-close"></use>
              </svg>
            </i>
          </div>
        </div>
        <i class="chat__file__input__icon">
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-image"></use>
          </svg>
        </i>
        <span>Прикрепить файл или фото</span>
        <input
          type="file"
          accept="image/x-png,image/gif,image/jpeg, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          multiple
          @change="fileChange"
        />
      </label>
    </div>
    <div class="chat__input">
      <textarea
        class="chat__input__text"
        placeholder="Напишите сообщение..."
        v-model="message"
        rows="1"
        @input="resize"
      ></textarea>
      <i @click="sendMessage" class="chat__input__send">
        <svg>
          <use xlink:href="/dist/images/icons.svg#icon-paper-plane"></use>
        </svg>
      </i>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatFooter",
  props: [],
  data: () => {
    return {
      message: "",
      files: [],
    };
  },
  mounted() {},
  computed: {},

  methods: {
    resize(e) {
      let height = e.target.offsetHeight;
      let scrollHeight = e.target.scrollHeight;
      if (height < scrollHeight) {
        e.target.style.height = `${scrollHeight}px`;
      }
    },
    sendMessage() {
      // this.message = this.message.replace(/\\r\\n/g, "<br />");

      this.$store.dispatch("sendMessage", {
        message: this.message,
        files: this.files,
      });

      this.message = "";
    },
    fileChange(event) {
      if (event.target.files.length > 5) {
        alert("Максимально можно прикрепить 5 файлов");
        return;
      }

      if (this.files.length < 5) {
        this.files.push(...Array.from(event.target.files));
      } else {
        alert("Максимально можно прикрепить 5 файлов");
      }
    },
  },
};
</script>

<style lang="scss">
.chat__footer {
  position: relative;
  margin: 0.75rem 1.5rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 1rem;
  align-items: center;

  border: 0.1rem solid var(--ct-dark-02);
  border-radius: 0.5rem;
  .chat {
    &__file {
      &__input {
        display: none;
      }
      &:hover {
        .chat__file__input {
          position: absolute;
          z-index: 10;
          bottom: 4.5rem;
          left: -1.5rem;
          cursor: pointer;
          background-color: var(--ct-white);
          border-radius: 0.5rem;
          box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);
          display: grid;
          grid-template-columns: max-content 1fr;
          align-items: center;
          &__list {
            padding: 0 1.5rem;
            grid-area: 1/1/2/3;

            display: flex;
            flex-flow: column nowrap;

            div {
              margin: 0.5rem 0;
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              justify-content: space-between;
              span {
                font-weight: 500;
                font-size: var(--text-14);
                line-height: 1.9rem;
              }
              i {
                padding: 0.5rem;
                svg {
                  fill: var(--ct-red);
                  width: 1rem;
                  height: 1rem;
                }
              }
            }
          }
          &__icon {
            padding-left: 1.5rem;
            grid-area: 2/1/3/2;
            svg {
              width: 2.1rem;
              height: 2.1rem;
            }
          }
          & > span {
            padding: 1.5rem;
            grid-area: 2/2/3/3;
            font-weight: 500;
            font-size: var(--text-16);
            line-height: 1.9rem;
            position: relative;
            &::before {
              content: "";
              border-radius: 0.1rem;
              background-color: var(--ct-white);
              transform: rotate(45deg);
              width: 2.2rem;
              height: 2.2rem;
              position: absolute;
              z-index: -10;
              left: -1rem;
              top: 3.5rem;
            }
          }

          input {
            display: none;
            outline: 0;
            opacity: 0;
            pointer-events: none;
            user-select: none;
          }
        }
      }
      &__icon {
        cursor: pointer;
        svg {
          width: 2.1rem;
          height: 2.1rem;
          fill: var(--ct-blue);
        }
      }
    }

    &__input {
      display: grid;
      grid-template-columns: 1fr max-content;
      grid-gap: 1rem;
      align-items: center;
      width: 100%;

      &__text {
        overflow: hidden;
        resize: none;
        -moz-appearance: none;
        outline: none;
        border: none;
        width: 100%;
        height: auto;

        font-weight: normal;
        font-size: var(--text-14);
        line-height: 2rem;
      }

      &__send {
        cursor: pointer;
        svg {
          width: 2.1rem;
          height: 2.1rem;
          fill: var(--ct-blue);
        }
      }
    }
  }
}
</style>
