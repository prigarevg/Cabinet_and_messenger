<template>
  <div class="question">
    <p class="question__text">
      {{ question.text }}
    </p>

    <div class="question__tags">
      <span v-for="tag in question.tags" :key="tag" class="question__tag">{{
        tag
      }}</span>
    </div>
    <a class="question__button" href="#">Ответить</a>
  </div>
</template>
<script>
export default {
  name: "QuestionCard",
  props: ["question"],
};
</script>

<style lang="scss" scoped>
.question {
  display: grid;
  grid-gap: 1rem;

  padding-bottom: 2rem;
  &:not(:first-child) {
    padding-top: 2rem;
  }

  &:not(:last-child) {
    border-bottom: 0.1rem solid rgba(15, 17, 55, 0.2);
  }
  &__text {
    grid-area: 1/1/2/3;
    color: var(--ct-dark);
    font-weight: 400;
    font-size: var(--text-18);
    line-height: 2.8rem;
  }

  &__tags {
    grid-area: 2/1/3/2;
    justify-self: start;
  }

  &__tag {
    font-weight: 500;
    font-size: var(--text-16);
    line-height: 2.8rem;
    color: var(--ct-green);

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }

  &__button {
    grid-area: 2/2/3/3;
    justify-self: end;
    text-decoration: underline;
    font-weight: 500;
    font-size: var(--text-18);
    line-height: 2.8rem;
    color: var(--ct-blue);
  }
}
</style>
