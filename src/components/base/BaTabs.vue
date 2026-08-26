<!-- 扩展<el-tabs></el-tabs> 缓存当前激活索引和组件 -->
<script>
export default {
  props: {
    modelValue: '',
    isTabLink: { type: Boolean, default: true },
    isSticky: { type: Boolean, default: true },
    // active 在 sessionStorage 的缓存key
    cacheKey: { type: String, default: '' },
  },
  data() {
    return {
      active:
        (this.cacheKey && sessionStorage.getItem(this.cacheKey)) ||
        (this.isTabLink && this.$route.query.index) ||
        this.modelValue ||
        '0',
      opened: [],
    }
  },
  computed: {},
  watch: {
    modelValue: {
      handler(val) {
        this.active = val
      },
    },
    active: {
      // immediate: true,
      handler(val) {
        // debugger
        this.opened.includes(val) || this.opened.push(val)
        this.$emit('update:modelValue', val)
      },
    },
  },
  created() {
    this.opened = [this.active]
    // this.active = this.$route.query.index || this.modelValue || '0'
  },
  mounted() {},
  methods: {
    tabClick(paneName) {
      this.active = paneName
      this.opened.includes(paneName) || this.opened.push(paneName)
      this.cacheKey && sessionStorage.setItem(this.cacheKey, paneName)
      this.isTabLink &&
        this.$router.replace({ path: this.$route.path, query: { ...this.$route.query, index: paneName } })
    },
  },
}
</script>

<template>
  <el-tabs class="BaTabs" :class="isSticky && 'isSticky'" v-model="active" @tab-change="tabClick">
    <slot v-bind="{ active, opened }"></slot>
  </el-tabs>
</template>

<style lang="scss" scoped>
.BaTabs.isSticky.el-tabs--top {
  // z-index: 99;
  // position: sticky !important;
  // top: 0;
  ::v-deep > .el-tabs__header {
    container-type: scroll-state;
    container-name: el-tabs__header;
    z-index: 99;
    position: sticky !important;
    top: var(--BaTabsTop, 0);
    background: var(--BgWhite);
    border-radius: var(--Radius);
    overflow: v-bind("isTabLink ? 'hidden': 'visible'");
    .el-tabs__nav-wrap {
      padding: 0 20px;
    }
    @container el-tabs__header scroll-state(stuck: top) {
      .el-tabs__nav-wrap::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0px 4px 20px 0px var(--BgBlack10);
      }
    }
    // .el-tabs__item.is-top:nth-child(2) {
    //   margin-left: 20px;
    // }
    // .el-tabs__item.is-top:last-child {
    //   margin-right: 20px;
    // }
  }
}
</style>
