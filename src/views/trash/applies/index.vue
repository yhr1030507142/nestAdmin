<script setup lang="ts">
import { getApplyList, saveApply, delApply } from '../api'

const statusOptions = {
  '0': '待处理',
  '1': '已联系',
  '2': '已匹配',
  '3': '已拒绝',
}
</script>

<template>
  <div>
    <RequestChartTable ref="rctRef" :request="getApplyList">
      <template #query="{ query }">
        <BaInput v-model="query.name" label="姓名" prop="name"></BaInput>
        <BaInput v-model="query.phone" label="手机号" prop="phone"></BaInput>
        <BaSelect v-model="query.status" filterable label="状态" prop="status" clearable>
          <el-option v-for="(label, value) of statusOptions" :key="value" :label="label" :value="value"></el-option>
        </BaSelect>
      </template>

      <template #operation="{ selectedIds }">
        <div class="flexBetween">
          <span></span>
          <el-button :disabled="!selectedIds.length" @click="$refs.rctRef.del(delApply)" type="danger">批量删除</el-button>
        </div>
      </template>

      <template #table>
        <el-table-column label="姓名" prop="name" width="100" />
        <el-table-column label="手机号" prop="phone" width="130" />
        <el-table-column label="微信" prop="wechat" width="130" :show-overflow-tooltip="true" />
        <el-table-column label="城市" prop="city" width="100" />
        <el-table-column label="技能" prop="skills" :show-overflow-tooltip="true" />
        <el-table-column label="期望方向" prop="direction" :show-overflow-tooltip="true" />
        <el-table-column label="申请时间" prop="createTime" width="170" />
        <el-table-column label="状态" prop="status" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '0' ? 'warning' : row.status === '1' ? 'primary' : row.status === '2' ? 'success' : 'info'">
              {{ statusOptions[row.status] }}
            </el-tag>
          </template>
        </el-table-column>
      </template>
      <template #tableOperation="{ row }">
        <el-button text @click="$refs.dialogRef.action(row)">查看/处理</el-button>
        <el-button text @click="$refs.rctRef.del(delApply, row.id)">删除</el-button>
      </template>
    </RequestChartTable>

    <BaDialog
      ref="dialogRef"
      dynamicTitle="申请详情"
      width="700"
      @confirm="$refs.dialogRef.confirm(saveApply, () => $refs.rctRef.getList(1))">
      <template #form="{ form }">
        <el-descriptions :column="2" border style="margin-bottom: 20px">
          <el-descriptions-item label="姓名">{{ form.name }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{ form.phone }}</el-descriptions-item>
          <el-descriptions-item label="微信">{{ form.wechat || '-' }}</el-descriptions-item>
          <el-descriptions-item label="城市">{{ form.city || '-' }}</el-descriptions-item>
          <el-descriptions-item label="出生日期">{{ form.birthDate || '-' }}</el-descriptions-item>
          <el-descriptions-item label="出生时辰">{{ form.birthTime || '-' }}</el-descriptions-item>
          <el-descriptions-item label="出生地" :span="2">{{ form.birthPlace || '-' }}</el-descriptions-item>
          <el-descriptions-item label="申请时间" :span="2">{{ form.createTime }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">技能与经历</el-divider>
        <div class="apply-text">
          <div class="apply-text__label">过往职业经历</div>
          <div class="apply-text__content">{{ form.experience || '未填写' }}</div>
        </div>
        <div class="apply-text">
          <div class="apply-text__label">擅长技能</div>
          <div class="apply-text__content">{{ form.skills || '未填写' }}</div>
        </div>
        <div class="apply-text">
          <div class="apply-text__label">希望探索的方向</div>
          <div class="apply-text__content">{{ form.direction || '未填写' }}</div>
        </div>
        <el-divider content-position="left">处理</el-divider>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="(label, value) of statusOptions" :key="value" :label="value">{{ label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <BaInput v-model="form.remark" type="textarea" :rows="3" label="备注" maxlength="500" />
      </template>
    </BaDialog>
  </div>
</template>

<style lang="scss" scoped>
.apply-text {
  margin-bottom: 16px;
  &__label {
    font-size: 13px;
    color: var(--FontGrey);
    margin-bottom: 4px;
  }
  &__content {
    font-size: 14px;
    color: var(--FontBlack);
    line-height: 1.7;
    padding: 8px 12px;
    background: var(--BgGrey);
    border-radius: 6px;
    min-height: 40px;
    white-space: pre-wrap;
  }
}
</style>
