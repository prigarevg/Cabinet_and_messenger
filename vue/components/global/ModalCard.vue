<template>
  <div class="modalCard">
    <div class="wrapper">
      <i class="modalCard__close"  @click="$emit('close')">
        <svg>
          <use xlink:href="/dist/images/icons.svg#icon-close"></use>
        </svg>
      </i>
      <div class="modalCard__header">
        <slot name="header"></slot>
      </div>
      <div class="modalCard__body">
        <slot name="body"></slot>
      </div>
      <div class="modalCard__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalCard",
  props: {},
  components: {},
};
</script>

<style lang="scss">
.modalCard {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ct-dark-02);

  display: grid;
  place-items: center;
  .wrapper {
    background-color: var(--ct-white);
    position: relative;
    padding: 3rem;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    right: 2rem;
    top: 2rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
  &__header {
    display: grid;
    place-items: center;
    font-weight: 500;
    font-size: var(--text-24);
    line-height: 2.8rem;
  }

  &__body {
    padding: 3rem 0;


  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
