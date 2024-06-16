<template>
  <div class="mainTemplate">
    <div class="DataLeft">
      <slot name="LeftData"></slot>
    </div>

    <div class="Main">
      <div class="MainContent">
        <slot name="Main"></slot>
      </div>
    </div>

    <div class="DataRight">
      <slot name="RightData"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainTemplate",
};
</script>

<style scoped lang="scss">
.mainTemplate {
  width: 100%;
  height: 100%;
  display: flex;

  .DataLeft,
  .DataRight {
    width: 20%;
    height: 100%;
    overflow: auto;
    //background: rgb(240, 248, 246);
    background: #fff;
    box-shadow: 0px 0px 35px 0px rgba(160, 170, 199, 0.5);
    border-radius: 4px;
  }
  .Main {
    // flex: 1;
    width: 60%;
    height: 100%;
    margin: 0 10px;

    .MainContent {
      width: 100%;
      height: 100%;
      //background: #FFFFFF;
      border-radius: 5px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0px 0px 35px 0px rgba(160, 170, 199, 0.5);
      border-radius: 4px;
    }
  }
}
</style>
