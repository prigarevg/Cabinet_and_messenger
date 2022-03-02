<template>
  <aside class="right-sidebar" id="right-sidebar">
    <ul class="links">
      <slot name="links"></slot>
      <li class="link">
        <a class="link__title" href="/cabinet/questions">Вопросы</a>
      </li>
      <li class="link">
        <a class="link__title" href="/cabinet/answers">Ответы</a>
      </li>
      <li class="link">
        <a class="link__title" href="/cabinet/articles">База знаний</a>
      </li>
      <li class="link">
        <a class="link__title" href="/cabinet/specialists">Топ специалисты</a>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: "RightSideBar",
  props: {},
  components: {},
};
</script>

<style lang="scss">
</style>
