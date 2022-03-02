<template>
  <div v-if="cards.length > 0" class="cards">
    <i class="cards__prev" @click="scroll(-1)">
      <svg>
        <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
      </svg>
    </i>
    <div class="cards__list" ref="cards">
      <card v-for="card in cards" :key="card.id" :card="card" v-if="card.user_access"/>
    </div>
    <i class="cards__next" @click="scroll(1)">
      <svg>
        <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
      </svg>
    </i>

  </div>
</template>
<script>
import Card from "./Card.vue";
export default {
  name: "CardList",
  props: {},
  components: { Card },
  data: () => {
    return {};
  },
  computed: {
    cards: {
      get: function () {
        return this.$store.getters.cards;
      },
    },
  },
  mounted() {},
  methods: {
    scroll(vector) {
      const el = this.$refs.cards;
      const childCount = el.childElementCount;
      const width = el.scrollWidth;

      if (vector > 0) {
        el.scrollLeft += width / childCount;
      } else if (vector < 0) {
        el.scrollLeft -= width / childCount;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
  grid-gap: 1rem;
  margin-bottom: 3rem;
  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: 20rem;
    grid-auto-flow: column;
    grid-auto-columns: 20rem;
    justify-content: start;
    grid-gap: 1rem;

    overflow-x: scroll;
    scroll-snap-type: x proximity;
    &::-webkit-scrollbar {
      display: none;
    }

    scroll-behavior: smooth;
      @media (min-width: 768px) and (max-width: 1024px) {

      }
  }

  &__next,
  &__prev {
    cursor: pointer;
    svg {
      width: 2rem;
      height: 1rem;
    }
  }

  &__next {
    svg {
      transform: rotate(-90deg);
    }
  }
  &__prev {
    svg {
      transform: rotate(90deg);
    }
  }
}
</style>
