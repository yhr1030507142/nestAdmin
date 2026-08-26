<!-- 使用示例
  <BaButton @click="$sdk.copyText(form.reply)">复制</BaButton>
-->

<script setup lang="ts">
import useAppStore from '@/stores'

const props = defineProps({
  icon: {
    type: String,
  },
})

const iconName = computed(() => {
  return props.icon ? `el-icon-${props.icon}` : ''
})
</script>

<template>
  <el-button :icon="iconName" class="BaButton" v-preventReClick="1000" :disabled="useAppStore().loading">
    <template #default v-if="$slots.default">
      <slot></slot>
    </template>
  </el-button>
</template>

<style lang="scss" scoped></style>
