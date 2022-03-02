<template>
  <div
    :style="{
      backgroundColor: bccolor,
      borderRadius: radius,
      cursor: 'pointer',
      padding: padding,
      boxShadow: shadow,
      display: 'flex',
    }"
  >
    <svg
      :style="{
        fill: color,
        width: width,
        height: height,
        margin: margin,
        transform: transform,
      }"
    >
      <use :xlink:href="'/dist/images/icons.svg#icon-' + icon"></use>
    </svg>
  </div>
</template>
<script>
export default {
  name: "SvgButton",
  props: {
    bccolor: "",
    color: "",
    icon: "",
    width: "",
    height: "",
    transform: "",
    margin: "",
    radius: "",
    padding: "",
    shadow: "",
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>