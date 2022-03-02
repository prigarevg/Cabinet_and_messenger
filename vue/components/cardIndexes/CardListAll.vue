<template>
  <div v-if="cards.length > 0" class="cards">
    <div class="cards__list" ref="cards">
      <card v-for="card in cards" :key="card.id" :card="card" v-show="card.user_access" />
    </div>
  </div>
</template>
<script>
import Card from "./Card.vue";
export default {
  name: "CardListAll",
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

  methods: {},
};
</script>

<style lang="scss" scoped>
.cards {
  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(23rem, max-content));
    grid-gap: 1rem;
    justify-content: center;
      @media (min-width: 768px) and (max-width: 1024px) {
          justify-content: left;
      }
  }
}
</style>
