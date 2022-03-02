<template>
  <button @click="$emit('click')" type="button" class="button" :class="color">
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "CtButton",
  props: { color: "", text: "" },
  components: {},
  data: () => {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.button {
  border: none;
  outline: none;
  padding: 1.2rem 2.8rem;

  cursor: pointer;

  font-weight: 800;
  font-size: var(--text-18);
  line-height: 2.2rem;

  border-radius: 0.5rem;

  &.blue {
    background-color: var(--ct-blue);
    color: var(--ct-white);

    &:hover {
      transition: background-color 0.2s;
      background-color: var(--ct-white);
      color: var(--ct-blue);
    }
  }
}
</style>