<script setup lang="ts">
import { getList, save, del, getDataPermissionType } from './api'
import { getTrees } from '@/views/system/menus/api'
import { yesOrNO, KEY_YES } from '@/utils/dictionary'

const rules = { name: [$sdk.ruleRequiredBlur], permissionKey: [$sdk.ruleRequiredBlur] }

const trees = ref([])
const menuRef = ref()
getTrees().then(({ data }) => (trees.value = data))
// 所有菜单节点数据
function getMenuAllCheckedKeys() {
  let checkedKeys = menuRef.value.getCheckedKeys()
  let halfCheckedKeys = menuRef.value.getHalfCheckedKeys()
  checkedKeys.unshift(...halfCheckedKeys)
  return checkedKeys
}

function isAdmin(row) {
  return row.permissionKey === 'admin'
}
</script>

<template>
  <div>
    <RequestChartTable ref="rctRef" :request="getList">
      <template #query="{ query }">
        <BaInput v-model="query.name" label="角色名称" prop="name"></BaInput>
        <BaInput v-model="query.permissionKey" label="权限字符" prop="key"></BaInput>
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
        <el-table-column label="角色名称" prop="name" :show-overflow-tooltip="true" />
        <el-table-column label="权限字符" prop="permissionKey" />
        <el-table-column label="角色员工" prop="role">
          <template #default="{ row }">
            <MultiTags :list="row.users" />
          </template>
        </el-table-column>
        <el-table-column label="是否激活" prop="isActive">
          <template #default="{ row }">
            {{ yesOrNO[row.isActive] }}
          </template>
        </el-table-column>
      </template>
      <template #tableOperation="{ row }">
        <el-button
          text
          @click="
            $refs.dialogRef.action(row, () =>
              $nextTick(() => $refs.menuRef.setCheckedKeys(row.menus.flatMap((e) => e.id))),
            )
          ">
          修改
        </el-button>
        <el-button text @click="$refs.rctRef.del(del, row.id)">删除</el-button>
      </template>
    </RequestChartTable>

    <!--  dialog -->
    <BaDialog
      ref="dialogRef"
      dynamicTitle="角色"
      :rules="rules"
      width="500"
      @confirm="
        $refs.dialogRef.confirm(
          (form) => ((form.menuIds = getMenuAllCheckedKeys()), save(form)),
          () => $refs.rctRef.getList(1),
        )
      ">
      <template #form="{ form }">
        <BaInput v-model="form.name" prop="name" label="角色名称" maxlength="30"></BaInput>
        <BaInput v-model="form.permissionKey" prop="permissionKey" label="权限字符" maxlength="30"></BaInput>
        <!-- <BaInput v-model="form.order" prop="order" type="number" label="角色顺序" maxlength="11"></BaInput> -->
        <el-form-item label="显示排序" prop="order">
          <el-input-number v-model="form.order" :precision="2" :step="1" :min="0" />
        </el-form-item>
        <el-form-item prop="isActive" label="是否激活">
          <el-radio-group v-model="form.isActive">
            <el-radio v-for="(value, key) of yesOrNO" :key="key" :label="value" :value="key"></el-radio>
          </el-radio-group>
          <!-- <el-switch v-model="value3" inline-prompt active-text="是" inactive-text="否" /> -->
        </el-form-item>
        <BaSelect
          label="数据权限"
          prop="dataPermissionType"
          v-model="form.dataPermissionType"
          :request="getDataPermissionType"></BaSelect>
        <el-form-item prop="menuIds" label="菜单权限">
          <el-tree
            :data="trees"
            show-checkbox
            ref="menuRef"
            node-key="id"
            check-strictly
            empty-text="加载中，请稍后"
            :props="{ label: 'name' }"></el-tree>
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
