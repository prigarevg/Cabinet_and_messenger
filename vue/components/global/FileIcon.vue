<template>
  <div
    :style="{
      backgroundColor: bccolor,
      borderRadius: radius,
      padding: padding,
      boxShadow: shadow,
      display: 'flex',
      position: 'relative',
      width: 'max-content',
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
      <use xlink:href="/dist/images/icons.svg#icon-file-type"></use>
    </svg>
    <span
      :style="{
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        padding: `calc(${height} / 26.6) ` + `calc(${width} / 3.5)`,
        fontSize: `calc(${height} / 5.7) `,
      }"
      >{{ text }}</span
    >
  </div>
</template>
<script>
export default {
  name: "SvgButton",
  props: {
    bccolor: "",
    color: "",
    width: "",
    height: "",
    transform: "",
    margin: "",
    radius: "",
    padding: "",
    shadow: "",
    text: "",
  },
  data: () => {
    return {
      colors: [
        "var(--ct-red)",
        "var(--ct-blue)",
        "var(--ct-green)",
        "var(--ct-yellow)",
        "var(--ct-dark-05)",
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
span {
  position: absolute;
  top: 50%;
  left: -15%;
  color: var(--ct-white);
  font-weight: 700;
  border-radius: 0.2rem;
}
</style>