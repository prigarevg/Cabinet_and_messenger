<template>
  <input
    :value="value"
    @input="onInput"
    @change="onChange"
    class="input"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
<script>
export default {
  name: "CtInput",
  props: {
    placeholder: "",
    disabled: "",
    type: "",
    value: {
      type: String,
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
.input {
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