<template>
  <div class="tab-card">
    <div class="title-content">
      <div class="title">
        <img src="@/assets/img/icon.png" style="margin-right: 1rem">
        <span>{{ title }}</span>
      </div>
      <slot class="right-tit" name="right"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},

  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.tab-card {
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
  background: #fff;
  box-shadow: 0px 0px 35px 0px rgba(160, 170, 199, 0.5);
  border-radius: 4px;
  .title-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d0e3fe;
    .title {
      //width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #6ca395;
      padding-bottom: 5px;
      white-space: nowrap;
      margin-right: 1rem;
      font-weight: 600;
      i {
        font-size: 25px;
        margin-right: 10px;
      }
    }
  }
}
</style>
