<template>
    <div class="items">
        <div class="item">
            <file-icon class="item__icon" width="3rem" height="4rem" :text="files.type"/>
            <span class="item__title">
      {{ files.name }}
    </span>
            <span class="item__size"> {{ files.size }} </span>
            <div class="item__send">
                <span class="item__send__date">{{ files.date }}</span>
                <div class="item__send__img">
                    <img src="/dist/images/no-avatar.jpg" alt=""/>
                </div>
            </div>
            <div @click="content.files ? (content.files = false) : (content.files = files)">
                <svg-button
                    class="item__more"
                    icon="more"
                    width="2rem"
                    height="2rem"
                    color="var(--ct-blue)"

                />
            </div>
            <div
                class="dropdown-content"
                v-show="content.files && content.files.id == files.id"
                @mouseleave="content.files = null"
            >
                <ul>
                    <li
                        @click="
                    file.forward=true
                  "
                    >
                        <svg-button
                            icon="forward"
                            width="2rem"
                            height="2rem"
                            bccolor="var(--ct-white)"
                            color="var(--ct-black)"
                            margin="1rem"
                        />

                        <span>Переслать</span>
                    </li>
                    <li
                        @click="
                  file.card=true
                   showModal('updateCard', Object.assign({}, files))
                  "
                    >
                        <svg-button
                            icon="pencil"
                            width="2rem"
                            height="2rem"
                            bccolor="var(--ct-white)"
                            color="var(--ct-black)"
                            margin="1rem"
                        />

                        <span>Переименовать</span>
                    </li>

                    <li
                        @click="
                    file.copy=true
                  "

                    >
                        <svg-button
                            icon="copy"
                            width="2rem"
                            height="2rem"
                            bccolor="var(--ct-white)"
                            color="var(--ct-black)"
                            margin="1rem"
                        />

                        <span>Копировать</span>
                    </li>


                    <li
                        @click="
                  file.card=true
                   showModal('destroyCard', Object.assign({}, files))
                  ">
                        <svg-button
                            icon="trash"
                            width="2rem"
                            height="2rem"
                            bccolor="var(--ct-white)"
                            color="var(--ct-black)"
                            margin="1rem"
                        />
                        <span>Удалить</span>
                    </li>
                </ul>
            </div>


        </div>


        <file-forward
            v-if="file.forward"
            :cards="cards"
            @close="file.forward = false"
        />
        <card-copy
            v-if="file.copy"
            :cards="cards"
            :item="modal.item"
            @close="file.copy = false"
        />
        <card-modal
            v-if="file.card"
            :value="files"
            :type="modal.type"
            :text="modal.text"
            :item="modal.item"
            @close="file.card= false"
        />
    </div>


</template>
<script>
import FileIcon from "../global/FileIcon.vue";
import SvgButton from "../global/SvgButton.vue";
import FileForward from "./FileForward";
import CardCopy from "./CardCopy";
import CardModal from "./CardModal.vue";


export default {
    name: "CardFile",
    props: {files: {}},
    components: {FileForward, CardCopy, CardModal, FileIcon, SvgButton},
    data: () => {
        return {

            modal: {
                type: "",
                text: "",
                item: "файл",
                card: false,
            },
            content: {
                files: false,
            },
            file: {
                forward: false,
                copy: false,
                card: false
            },
        };
    },
    computed: {
        cards: {
            get: function () {
                return this.$store.getters.cards;
            },

        },
        users: {
            get: function () {
                return this.$store.getters.users;
            },

        }
    },
    mounted() {
        this.$store.dispatch("setCards");
    },
    methods: {
        showModal(type, card) {

            this.modal.type = type;
            this.modal.card = card;
            this.modal.item = "файл"


            switch (type) {
                case "addCard":
                    this.modal.text = "Создать";
                    break;
                case "updateCard":
                    this.modal.text = "Обновить";
                    break;
                case "destroyCard":
                    this.modal.text = "Удалить";
                default:
                    break;
            }
        }
    },

};
</script>

<style lang="scss" scoped>
.item {
    display: grid;
    grid-gap: 0.5rem 1rem;
    grid-template-columns: max-content 1fr repeat(2, max-content);
    align-items: center;

    &__icon {
        grid-area: 1/1/3/2;
    }

    &__title {
        grid-area: 1/2/2/3;
        align-self: end;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 1.6rem;
    }

    &__size {
        grid-area: 2/2/3/3;
        align-self: start;
        font-weight: 300;
        font-size: 1.1rem;
        line-height: 1.3rem;
        color: var(--ct-dark-07);
    }

    &__send {
        grid-area: 1/3/2/4;
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        grid-gap: 1rem;

        &__date {
            font-weight: 300;
            font-size: 1.1rem;
            line-height: 1.3rem;
            color: var(--ct-dark-07);
        }

        &__img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;

            img {
                border-radius: 50%;
            }
        }
    }

    &__more {
        grid-area: 1/4/3/5;
        visibility: hidden;
    }

    &:hover {
        .item__more {
            visibility: visible;
        }
    }
}

.dropdown-content {
    position: absolute;
    right: 53.5rem;
    margin-top: 4rem;
    z-index: 100;
    background-color: var(--ct-white);
    border-radius: 0.5rem;
    box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);
    @media (max-width: 1024px){
        right: 2.5rem!important;
        margin-top: 5rem!important;
    }

    ul {
        li {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            span {
                font-weight: 500;
                font-size: var(--text-14);
                line-height: 1.9rem;
                color: var(--ct-black);
                margin-right: 1rem;
            }
        }
    }
}
</style>
