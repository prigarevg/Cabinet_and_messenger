<template>
    <label>
        <input type="radio" name="card" class="card-select">
        <div
            v-if="card"
            class="card"
            @click="selected_card=card, selectCard(selected_card.id)"
        >
            <i class="card__icon">
                <svg>
                    <use xlink:href="/dist/images/icons.svg#icon-folder"></use>
                </svg>
            </i>
            <span class="card__name"><a :href="'/cabinet/cardIndexes/' + card.id"
            >{{ card.name }}
              </a></span>
        </div>
    </label>
</template>
<script>
import store from "../../store/cardIndexes";

export default {
    data: function () {
        return {
            selected_card: null,
            checked: null,
        }
    },
    name: "Card",
    store,
    props: {
        card: {},
        card_id: null,
    },
    components: {},
    methods: {
        selectCard(card_id) {
            console.log(card_id)
            this.$store.dispatch('setSelectedCard', card_id)

        },
    },
};
</script>

<style lang="scss" scoped>

.card {
    cursor: pointer;
    box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);
    background-color: var(--ct-white);
    border-radius: 0.5rem;

    height: 7rem;
    padding: 1.5rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow-wrap: anywhere;

    &__icon {

        svg {
            fill: var(--ct-dark-07);
            width: 3rem;
            height: 3rem;
        }
    }

    &__name {
        margin-left: 1rem;
        color: var(--ct-dark-07);
        font-weight: 500;
        font-size: var(--text-16);
        line-height: 1.9rem;
    }

    &:hover {
        border: 0.1rem solid var(--ct-blue);
        color: var(--ct-blue);

        span {
            color: var(--ct-blue);
        }

        svg {
            fill: var(--ct-blue);
        }
    }
}

.card-select {
    display: none;

    &:checked + .card {
        border: 0.1rem solid var(--ct-blue);
        color: var(--ct-blue);

        span {
            color: var(--ct-blue);
        }

        svg {
            fill: var(--ct-blue);
        }
    }
}
</style>
