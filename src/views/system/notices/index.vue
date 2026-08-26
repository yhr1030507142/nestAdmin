<script setup lang="ts">
import { getList, save, del } from './api'
import { yesOrNO, KEY_YES } from '@/utils/dictionary'

const rules = { title: [$sdk.ruleRequiredBlur], permissionKey: [$sdk.ruleRequiredBlur] }
</script>

<template>
  <div>
    <RequestChartTable ref="rctRef" :request="getList">
      <template #query="{ query }">
        <BaInput v-model="query.title" label="公告标题" prop="title"></BaInput>
        <BaSelect v-model="query.isActive" filterable label="是否激活" prop="isActive">
          <el-option v-for="(value, key) of yesOrNO" :key="key" :label="value" :value="key"></el-option>
        </BaSelect>
      </template>

      <template #operation="{ selectedIds }">
        <div class="flexBetween">
          <el-button type="primary" @click="$refs.dialogRef.action({ isActive: KEY_YES })">新增</el-button>
          <el-button :disabled="!selectedIds.length" @click="$refs.rctRef.del(del)" type="danger">批量删除</el-button>
        </div>
      </template>

      <template #table>
        <el-table-column label="公告标题" prop="title" :show-overflow-tooltip="true" />
        <el-table-column label="公告内容" prop="content" :show-overflow-tooltip="true" />
        <el-table-column label="是否激活" prop="isActive">
          <template #default="{ row }">
            {{ yesOrNO[row.isActive] }}
          </template>
        </el-table-column>
      </template>
      <template #tableOperation="{ row }">
        <el-button text @click="$refs.dialogRef.action(row)">修改</el-button>
        <el-button text @click="$refs.rctRef.del(del, row.id)">删除</el-button>
      </template>
    </RequestChartTable>

    <!--  dialog -->
    <BaDialog
      ref="dialogRef"
      dynamicTitle="角色"
      :rules="rules"
      width="500"
      @confirm="$refs.dialogRef.confirm(save, () => $refs.rctRef.getList(1))">
      <template #form="{ form }">
        <BaInput v-model="form.title" prop="title" label="公告标题" maxlength="30"></BaInput>
        <BaInput v-model="form.content" type="textarea" prop="content" label="公告内容" maxlength="200"></BaInput>
        <!-- <BaInput v-model="form.order" prop="order" type="number" label="角色顺序" maxlength="11"></BaInput> -->
        <el-form-item prop="isActive" label="是否激活">
          <el-radio-group v-model="form.isActive">
            <el-radio v-for="(value, key) of yesOrNO" :key="key" :label="value" :value="key"></el-radio>
          </el-radio-group>
        </el-form-item>

        <BaInput v-model="form.remark" type="textarea" prop="remark" label="备注" maxlength="200"></BaInput>
      </template>
    </BaDialog>
  </div>
</template>

<style lang="scss" scoped>
.title-name {
  font-size: 14px;

  font-weight: 600;
  color: var(--FontBlack);
  display: flex;
  align-items: center;
}
.bottom {
  justify-content: flex-end;
  padding: 20px;
}
</style>
