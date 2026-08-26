<template>
  <el-drawer v-model="visible" title="主题设置" size="300px" :modal="false" append-to-body z-index="999">
    <div class="pl20">
      <div class="drawer-item">
        <span class="mr20">主题颜色</span>
        <el-color-picker
          v-model="theme"
          @active-change="themeActiveChange"
          color-format="hsl"
          :predefine="['#9452fe', '#1890ff', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']" />
      </div>

      <div class="mt10">
        <el-button type="primary" @click="cancel">确定</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      theme: getComputedStyle(document.documentElement).getPropertyValue('--Color'),
      themeOld: this.theme,
      visible: false,
    }
  },
  computed: {},
  created() {
    this.themeOld = this.theme
  },
  methods: {
    themeActiveChange(val) {
      val || (val = this.themeOld)
      if (val) {
        let [h, s, l] = val
          .slice(4, -1)
          .split(',')
          .map((e) => e.trim())
        let style = document.documentElement.style
        style.setProperty('--h', h)
        style.setProperty('--s', s)
        style.setProperty('--l', l)

        localStorage.hsl = `${h},${s},${l}`
      }
    },
    // 恢复默认主题
    reset() {
      let style = document.documentElement.style
      style.removeProperty('--h')
      style.removeProperty('--s')
      style.removeProperty('--l')
      localStorage.hsl = ''
    },
    // 恢复上一次主题
    cancel() {
      this.themeActiveChange(this.themeOld)
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer-title {
  margin-bottom: 12px;
  color: var(--FontBlack2);
  font-size: 14px;
  line-height: 22px;
}

.drawer-item {
  color: var(--FontBlack5);
  font-size: 14px;
  padding: 0 0 12px;
}

.drawer-switch {
  float: right;
}
</style>
