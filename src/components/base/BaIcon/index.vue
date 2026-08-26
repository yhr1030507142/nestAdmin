<!--
 <BaIcon name="icon" class="font18" />
  -->
<template>
  <div :class="['BaIcon', isAction && 'BaIcon-action']" :title="$slots.default?.()[0].children" v-bind="$attrs">
    <component
      :is="elIconName"
      :class="elIconName"
      v-if="/^el-/i.test(name)"
      :title="$slots.default?.()[0].children"></component>
    <svg class="BaIcon-svg" v-else aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    // 图标名称
    name: {
      type: String,
    },
    isAction: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return {
      elIconName: computed(() => {
        let arr = props.name?.split('-') || []
        arr.splice(1, 0, 'icon')
        return arr.join('-')
      }),
      iconName: computed(() => `#icon-${props.name}`),
    }
  },
})
</script>

<style scope lang="scss">
.BaIcon {
  display: inline-block;
  line-height: 1;
  font-size: 18px;
  &-action {
    cursor: pointer;
    &:hover {
      color: var(--Color);
    }
  }
}

.BaIcon-svg {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
.sub-el-icon,
.nav-icon {
  display: inline-block;
  font-size: 15px;
  margin-right: 12px;
  position: relative;
}
</style>
