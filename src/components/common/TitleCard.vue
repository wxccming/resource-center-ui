<template>
  <div class="TitleCard" :style="{ width: Mywidth }">{{ title }}</div>
</template>

<script>
export default {
  name: "TitleCard",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    Mywidth: {
      type: String,
      default: "100%",
    },
  },
};
</script>

<style scoped lang="scss">
.TitleCard {
  padding: 0.6rem;
  margin: 1rem 0;
  text-align: start;
  color: #242424;
  // font-family: Source Han Sans CN;
  font-weight: 500;
  font-size: 17px;
}
</style>
