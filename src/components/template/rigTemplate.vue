<template>
  <div class="rigTemplate">
    <div class="Main">
      <!-- <div class="search" ref="search">
        <span class="inputSear">
          <slot class="input" name="Main"></slot>
        </span>
      </div> -->
      <div class="centerData">
        <slot name="centerData"></slot>
      </div>
    </div>
    <div class="DataRight">
      <slot name="RightData"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "rigTemplate",
};
</script>

<style scoped lang="scss">
.rigTemplate {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0px 10px 30px 10px;
  margin-top:15px;
  .DataRight {
    width: 37.5rem;
    height: 100%;
  }
  .Main {
    flex: 1;
    width: 100%;
    height: 100%;
    margin-right: 10px;
    .search {
      width: 100%;
      height: 8%;
      display: flex;
      justify-content: flex-end;
      align-content: center;
      .inputSear {
        width: 20%;
        line-height: 4;
        margin-right: 20px;
      }
    }
    .centerData {
      height: 100%;
      // padding: 0 20px 10px;
    }
  }
}
</style>
