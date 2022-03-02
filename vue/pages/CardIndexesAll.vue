<template>
    <div class="wrapper">
        <div class="page cardIndex">
            <page-header title="Картотека дел">
                <div @click="showModal('addCard', card)">
                    <svg-button
                        icon="plus"
                        width="2rem"
                        height="2rem"
                        radius="50%"
                        padding="1rem"
                        shadow="0px 0px 1rem rgba(0, 0, 0, 0.07)"
                        bccolor="var(--ct-white)"
                    />
                </div>
                <div

                    @click="
                content.card ? (content.card = false) : (content.card = selected_card)
              ">
                    <svg-button icon="more" width="2rem" height="2rem"/>

                </div>
                <div
                    v-show="content.card && content.card.id == selected_card.id"
                    class="cardIndex__tooltip__content"

                >
                    <ul>
                        <li
                            @click="
                    showModal('updateCard', Object.assign({}, content.card))
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

                        <li @click="showModal('destroyCard', content.card)">
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
            </page-header>

            <card-list-all/>
        </div>

        <right-side-bar>
            <li class="link active" slot="links">
                <a class="link__title" href="/cabinet/cardIndexes">Картотека дел</a>
                <span class="link__button">
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-settings-line"></use>
          </svg>
        </span>
                <ul class="link__services">
                    <li
                        v-for="(card, index) in cards"
                        :key="card.id"
                        class="link__service"
                        v-if="card.user_access"
                    >
                        <svg-button icon="folder" width="1rem" height="1rem"/>
                        <span class="link__service__name">{{ card.name }}</span>
                        <div
                            class="link__service__more"
                            @click="
                tooltip.card ? (tooltip.card = false) : (tooltip.card = card)
              "
                        >
                            <svg-button
                                icon="more"
                                width="1.5rem"
                                height="1rem"
                                bccolor="transparent"
                                color="var(--ct-blue)"
                                transform="rotate(90deg)"
                            />
                        </div>

                        <div
                            v-show="tooltip.card && tooltip.card.id == card.id"
                            class="cardIndex__tooltip"
                            :class="'bottom'"
                            @mouseleave="tooltip.card = null"
                        >
                            <ul>

                                <li
                                    @click="
                    showModal('updateCard', Object.assign({}, tooltip.card))
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
                                    @click="showModal('destroyCard', tooltip.card)">
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
                    </li>
                </ul>
            </li>
        </right-side-bar>
        <card-modal
            v-if="modal.card"
            :value="modal.card"
            :type="modal.type"
            :text="modal.text"
            :item="modal.item"
            @close="modal.card = false"
        />
        <card-share
            v-if="share.card"
            :value="share.card"
            :cards="cards"
            :user="user"
            @close="share.card = false"
            @click="share.card=false">
        </card-share>
        <card-copy
            v-if="copy.card"
            :value="copy.card"
            :cards="cards"
            :user="user"
            :item="modal.item"
            @close="copy.card = false"
            @click="copy.card=false">
        </card-copy>
        <card-move
            v-if="move.card"
            :value="move.card"
            :cards="cards"
            :user="user"
            :item="modal.item"
            @close="move.card = false"
            @click="move.card=false">
        </card-move>
    </div>
</template>
<script>
import CardListAll from "../components/cardIndexes/CardListAll.vue";
import CtButton from "../components/global/CtButton.vue";
import PageHeader from "../components/global/PageHeader.vue";
import CardModal from "../components/cardIndexes/CardModal.vue";
import RightSideBar from "../components/global/RightSideBar.vue";
import SvgButton from "../components/global/SvgButton.vue";
import store from "../store/cardIndexes";
import CardShare from "../components/cardIndexes/CardShare";
import CardCopy from "../components/cardIndexes/CardCopy";
import CardMove from "../components/cardIndexes/CardMove";

export default {
    el: "#card-indexes-all-vue",
    store,
    data() {
        return {
            card: {
                id: null,
                name: "",
                user_id: Number,
            },
            modal: {
                type: "",
                text: "",
                item: "дело",
                card: false,
            },
            link:  {
                card: false
            },
            share: {
                ownerId: null,
                userId: null,
                card: false
            },
            copy: {
                card: false
            },
            move: {
                card: false
            },
            tooltip: {
                card: false,
            },
            content: {
                card: false,
            },

        };
    },
    computed: {
        tasks: {
            get: function () {
                return this.$store.getters.user;
            },
        },
        cards: {
            get: function () {
                return this.$store.getters.cards;
            },
        },
        user: {
            get: function () {
                return this.$store.getters.user;
            },
        },
        selected_card: {
            get: function () {
                return this.$store.getters.selected_card;
            },
        }
    },
    components: {
        CardShare,
        CardCopy,
        PageHeader,
        RightSideBar,
        CardModal,
        CtButton,
        SvgButton,
        CardListAll,
        CardMove,
    },
    mounted() {
        this.$store.dispatch("setUser");
        this.$store.dispatch("setUsers");
        this.$store.dispatch("setCards");
    },
    methods: {
        showModal(type, card) {
            this.tooltip.card = false;
            this.content.card = false;
            this.modal.type = type;
            this.modal.card = card;
            this.modal.item = "дело";
            this.share.card = false;

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
        },
        showAlert: function (event) {
            alert('Ссылка скопирована')
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 2.3fr minmax(20.5rem, 0.7fr);
    grid-gap: 3rem;
}


@media (min-width: 1025px) and (max-width: 1440px) {
    .wrapper {
        grid-gap: 1rem;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .wrapper {
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }
    .cardIndex__tooltip__content{
        margin-top: 13rem!important;
        right: 2.1rem!important;
    }
}

@media (max-width: 767px) {
    .wrapper {
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }
    .cardIndex__tooltip__content{
        margin-top: 13rem!important;
        right: 3%!important;
    }
}

.cardIndex {
    &__tooltip__content {
        position: absolute;
        margin-top: 13rem;
        right: 25rem;
        z-index: 100;
        background-color: var(--ct-white);
        border-radius: 0.5rem;
        box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);
        cursor: pointer;

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

    &__tooltip {
        position: absolute;

        right: 2rem;
        z-index: 100;
        background-color: var(--ct-white);
        border-radius: 0.5rem;
        box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);

        &.bottom {
            top: 2rem;
        }

        &.top {
            bottom: 2rem;
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
}

.link {
    &__services {
        width: 20.5rem;
    }

    &__service {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        position: relative;

        &__name {
            flex-grow: 1;
            margin-left: 0.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &__more {
            visibility: hidden;
        }

        &:hover {
            .link {
                &__service {
                    &__name {
                        color: var(--ct-blue);
                    }

                    &__more {
                        visibility: visible;
                    }
                }
            }
        }
    }
}
</style>
