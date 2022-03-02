<template>
    <div class="moveBlock">
        <div class="moveBlock__content">
            <h1 class="moveBlock__header">Переместить в...</h1>
            <div class="scrolling-cards">
                <div v-for="(cardItem) in cards"
                     :key="cardItem.id"
                     @click="user_message=true"
                     class="moveBlock__users">
                    <svg>
                        <use xlink:href="/dist/images/icons.svg#icon-folder"></use>
                    </svg>
                    <h1>{{ cardItem.name }}</h1>
                </div>
            </div>
            <div class="moveBlock__buttons">
                <button class="cancel-btn" @click="$emit('close')">Отмена</button>
                <button class="ready-btn" @click="$emit('close')">Готово</button>
            </div>
            <button class="createCard-btn" @click="showModal('addCard', card)">Создать дело</button>

        </div>

        <card-modal
            v-if="modal.card"
            :value="modal.card"
            :type="modal.type"
            :text="modal.text"
            :item="item"
            @close="modal.card = false"
        />
    </div>
</template>

<script>
import Card from "./Card.vue";
import CardModal from "./CardModal.vue";


export default {
    props: {value: Object, user: Object, cards: Array, item: String},
    data: function () {
        return {
            //card: this.value,
            roles: 'reader',
            share_roles: 'reader',
            access: false,
            link: true,
            showList: false,
            user_message: false,
            card: {
                id: null,
                name: "",
                user_id: Number,
            },
            modal: {
                type: "",
                text: "",
                item: "",
                card: false,
            },
        };

    },
    components: {
        Card,
        CardModal,
    },
    methods: {
        showModal(type, card) {
            this.modal.type = type;
            this.modal.card = card;

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
    }
}
</script>

<style lang="scss" scoped>
@mixin back {
    background-color: var(--ct-white);
    position: relative;
    width: 62rem;
    min-height: 42rem;
    height: max-content;
    border-radius: 5px;
    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
    padding-bottom: 2rem;
    @media (max-width: 767px) {
        width: 30rem !important;
        padding: 2rem !important;
    }
}

.moveBlock {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--ct-dark-02);

    &__header {
        text-align: center;
        padding: 4rem;
    }

    &__content {
        @include back;
        top: calc(50% - 21rem);
        left: calc(50% - 31rem);
        @media (max-width: 767px){
            top: calc(50% - 24rem)!important;
            left: calc(50% - 15rem)!important;
            width: 30rem!important;
        }

        svg {
            width: 2rem;
            height: 2rem;
        }
    }

    &__users {
        display: grid;
        grid-template-columns: min-content 1fr;
        align-items: center;
        padding: 1.5rem;

        svg {
            grid-area: 1/1/1/1;
            margin-left: 2rem;
        }

        h1 {
            grid-area: 1/2/1/2;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            text-align: left;
            margin-left: 1rem;

        }

        &:hover {
            background-color: #ebf8fc;
        }
    }

    &__buttons {
        display: flex;
        justify-content: flex-end;
        margin-right: 4rem;
        @media (max-width: 767px){
            margin-right: 2rem!important;
        }

    }
}

.ready-btn {
    border: none;
    outline: none;
    padding: 1.2rem 2.8rem;
    background-color: var(--ct-blue);
    color: var(--ct-white);
    cursor: pointer;
    width: 13.5rem;
    height: 4.6rem;
    font-weight: 800;
    font-size: var(--text-18);
    line-height: 2.2rem;
    border-radius: 0.5rem;
    justify-self: end;

    &:hover {
        transition: background-color 0.2s;
        background-color: var(--ct-white);
        color: var(--ct-blue);

    }

}

.cancel-btn {
    border: none;
    outline: none;
    padding: 1.2rem 2.8rem;
    background-color: var(--ct-white);
    color: #6f7087;
    cursor: pointer;
    width: 13.5rem;
    height: 4.6rem;
    font-weight: 800;
    font-size: var(--text-18);
    line-height: 2.2rem;
    border-radius: 0.5rem;
    justify-self: end;
}

.createCard-btn {
    border: none;
    background-color: transparent;
    padding: 1rem 0 0 3rem;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.01em;
    color: #3FB777;

}

.scrolling-cards {
    overflow-y: scroll;
    height: 21rem;
    margin-right: 0.5rem;

    &::-webkit-scrollbar {
        width: 0.3rem;
        background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        height: 6.5rem;
        padding-right: 1rem;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #95d6ef;
    }
}

</style>
