<script setup lang="ts">
import { getStoryList, saveStory, delStory } from '../api'
import { yesOrNO, KEY_YES } from '@/utils/dictionary'

const rules = {
  tag: [$sdk.ruleRequiredBlur],
  title: [$sdk.ruleRequiredBlur],
  name: [$sdk.ruleRequiredBlur],
  quote: [$sdk.ruleRequiredBlur],
}

const tagColorOptions = [
  { label: '棕色', value: '#c68642' },
  { label: '绿色', value: '#6a8f5f' },
  { label: '粉色', value: '#b06a7a' },
  { label: '蓝色', value: '#7a8fb5' },
  { label: '紫色', value: '#8b7ab5' },
]

const avatarColorOptions = [
  { label: '棕黄', value: '#d49a5c' },
  { label: '绿色', value: '#6a8f5f' },
  { label: '粉色', value: '#b06a7a' },
  { label: '蓝色', value: '#7a8fb5' },
]
</script>

<template>
  <div>
    <RequestChartTable ref="rctRef" :request="getStoryList">
      <template #query="{ query }">
        <BaInput v-model="query.title" label="故事标题" prop="title"></BaInput>
        <BaSelect v-model="query.isActive" filterable label="是否激活" prop="isActive">
          <el-option v-for="(value, key) of yesOrNO" :key="key" :label="value" :value="key"></el-option>
        </BaSelect>
      </template>

      <template #operation="{ selectedIds }">
        <div class="flexBetween">
          <el-button type="primary" @click="$refs.dialogRef.action({ isActive: KEY_YES, order: 0 })">新增故事</el-button>
          <el-button :disabled="!selectedIds.length" @click="$refs.rctRef.del(delStory)" type="danger">批量删除</el-button>
        </div>
      </template>

      <template #table>
        <el-table-column label="配图" prop="image" width="100">
          <template #default="{ row }">
            <el-image v-if="row.image" :src="row.image" style="width: 60px; height: 40px; border-radius: 6px" fit="cover" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" prop="tag" width="120">
          <template #default="{ row }">
            <el-tag effect="plain" :style="{ color: row.tagColor, borderColor: row.tagColor + '40', backgroundColor: row.tagColor + '15' }">
              {{ row.tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="故事标题" prop="title" :show-overflow-tooltip="true" />
        <el-table-column label="姓名" prop="name" width="100" />
        <el-table-column label="排序" prop="order" width="70" />
        <el-table-column label="状态" prop="isActive" width="80">
          <template #default="{ row }">
            {{ yesOrNO[row.isActive] }}
          </template>
        </el-table-column>
      </template>
      <template #tableOperation="{ row }">
        <el-button text @click="$refs.dialogRef.action(row)">修改</el-button>
        <el-button text @click="$refs.rctRef.del(delStory, row.id)">删除</el-button>
      </template>
    </RequestChartTable>

    <BaDialog
      ref="dialogRef"
      dynamicTitle="故事"
      :rules="rules"
      width="680"
      @confirm="$refs.dialogRef.confirm(saveStory, () => $refs.rctRef.getList(1))">
      <template #form="{ form }">
        <el-row :gutter="20">
          <el-col :span="12">
            <BaInput v-model="form.tag" prop="tag" label="标签" maxlength="30" placeholder="如：前教培从业者" />
          </el-col>
          <el-col :span="12">
            <BaInput v-model="form.name" prop="name" label="姓名" maxlength="20" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <BaFormItem prop="tagColor" label="标签颜色">
              <el-select v-model="form.tagColor" placeholder="选择标签颜色" style="width: 100%">
                <el-option v-for="opt in tagColorOptions" :key="opt.value" :label="opt.label" :value="opt.value">
                  <span :style="{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '3px', background: opt.value, marginRight: '8px', verticalAlign: 'middle' }"></span>
                  {{ opt.label }}
                </el-option>
              </el-select>
            </BaFormItem>
          </el-col>
          <el-col :span="12">
            <BaFormItem prop="avatarColor" label="头像颜色">
              <el-select v-model="form.avatarColor" placeholder="选择头像颜色" style="width: 100%">
                <el-option v-for="opt in avatarColorOptions" :key="opt.value" :label="opt.label" :value="opt.value">
                  <span :style="{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', background: opt.value, marginRight: '8px', verticalAlign: 'middle' }"></span>
                  {{ opt.label }}
                </el-option>
              </el-select>
            </BaFormItem>
          </el-col>
        </el-row>
        <BaInput v-model="form.avatarLetter" prop="avatarLetter" label="头像文字（姓氏）" maxlength="2" placeholder="如：林" />
        <BaInput v-model="form.title" prop="title" label="故事标题" maxlength="100" />
        <BaInput v-model="form.quote" type="textarea" prop="quote" label="引用语/故事内容" :rows="4" />
        <BaInput v-model="form.duration" prop="duration" label="加入时长" maxlength="30" placeholder="如：加入 6 个月" />
        <BaFormItem prop="image" label="配图">
          <BaUpload v-model:fileUrl="form.image" :params="{ module: 'trash' }"></BaUpload>
        </BaFormItem>
        <el-row :gutter="20">
          <el-col :span="12">
            <BaInputNumber v-model="form.order" :precision="0" :step="1" :min="0" prop="order" label="排序" />
          </el-col>
          <el-col :span="12">
            <el-form-item prop="isActive" label="是否激活">
              <el-radio-group v-model="form.isActive">
                <el-radio v-for="(value, key) of yesOrNO" :key="key" :label="value" :value="key"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </BaDialog>
  </div>
</template>
