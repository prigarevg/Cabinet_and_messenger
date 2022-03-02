<template>
  <select
    class="select"
    :value="value"
    @input="onInput"
    @change="onChange"
    :disabled="disabled"
  >
      <option value="" selected>Выберите дело</option>
    <option
      v-for="option in options"
      :key="option.id"
      :value="option.id"
      v-show="option.user_access"
      v-if="option.user_access"
    >
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: "CtInput",
  props: {
    options: [],
    selected: 0,
    placeholder: "",
    disabled: "",
    value: {
      type: 0,
      required: true,
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
    onChange(event) {
      this.$emit("change", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  overflow: hidden;
  resize: none;
  -moz-appearance: none;
  outline: none;
  border: 0.1rem solid var(--ct-dark-02);
  width: 100%;
  height: auto;

  font-weight: 300;
  font-size: var(--text-16);
  line-height: 1.8rem;

  padding: 1.6rem 2rem;

  border-radius: 0.5rem;

  &::placeholder {
    color: var(--ct-dark-05);
  }
}
</style>
