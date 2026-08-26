<script setup lang="ts"></script>

<template>
  <el-popover class="BaPopover" width="auto" placement="top" effect="light" :show-after="300">
    <template #reference>
      <slot></slot>
    </template>
    <template #default>
      <slot name="content"></slot>
    </template>
  </el-popover>
</template>

<style lang="css" scoped></style>
