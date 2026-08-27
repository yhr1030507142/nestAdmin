<script setup lang="ts">
import { getTrees, del, save } from './api'

const rules = { name: [$sdk.ruleRequiredBlur] }
const trees = ref([{ id: '0', name: '主类目', children: [] }])

function getTreesFun() {
  getTrees().then(({ data }) => (trees.value[0].children = data))
}
getTreesFun()
</script>

<template>
  <div>
    <RequestChartTable ref="rctRef" :request="getTrees" :isPageQuery="false">
      <template #operation>
        <el-button type="primary" @click="$refs.dialogRef.action({ parentId: '0' })">新增部门</el-button>
      </template>

      <template #="{ data }">
        <el-table :data="data" row-key="id" :tree-props="{ children: 'children' }" default-expand-all>
          <el-table-column prop="name" label="部门名称" align="left"></el-table-column>
          <el-table-column label="操作" width="220">
            <template #default="{ row }">
              <el-button text @click="$refs.dialogRef.action(row)">修改</el-button>
              <el-button text @click="$refs.dialogRef.action({ parentId: row.id })">新增子部门</el-button>
              <el-button text @click="$refs.rctRef.del(del, row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </RequestChartTable>

    <BaDialog
      ref="dialogRef"
      dynamicTitle="部门"
      :rules="rules"
      width="500"
      @confirm="$refs.dialogRef.confirm(save, () => { getTreesFun(); $refs.rctRef.getList() })">
      <template #form="{ form }">
        <el-form-item class="width100" label="上级部门">
          <el-tree-select
            v-model="form.parentId"
            :data="trees"
            node-key="id"
            show-checkbox
            check-strictly
            :props="{ label: 'name' }"
            placeholder="选择上级部门" />
        </el-form-item>
        <BaInput v-model="form.name" prop="name" label="部门名称"></BaInput>
      </template>
    </BaDialog>
  </div>
</template>

<style lang="scss" scoped></style>