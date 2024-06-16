<template>
  <div class="statisticalTemllate">
    <div class="DataTop">
      <slot name="searchTop"></slot>
    </div>

    <div class="Main">
      <slot name="Main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "statisticalTemllate",
};
</script>

<style scoped lang="scss">
.statisticalTemllate {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .DataTop {
    width: 100%;
    height: 5rem;
  }
  .Main {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(160, 170, 199, 0.5);
    opacity: 0.94;
  }
}
</style>
