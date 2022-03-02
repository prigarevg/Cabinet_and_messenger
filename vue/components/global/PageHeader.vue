<template>
  <div class="page__header">
    <h3 class="page__header__title">{{ title }}</h3>
    <div class="page__header__buttons">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  props: {
    title: String,
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>