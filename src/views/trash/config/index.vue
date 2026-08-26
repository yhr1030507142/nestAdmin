<script setup lang="ts">
import { getSiteConfig, saveSiteConfig } from '../api'

const formRef = ref()
const form = ref<any>({})
const loading = ref(false)
const activeTab = ref('hero')

const defaultConfig = {
  heroBadge: '已有 1,247 位伙伴在这里重新出发',
  heroTitle1: '失业不是终点',
  heroTitle2Accent: '是重新认识自己',
  heroTitle2: '的开始',
  heroPartnersText: '来自各行各业的伙伴',
  processSubtitle: '我们不卖课程，不推销机会。只是帮你找到对的人，一起做点有意义的事。',
  statValue1: '1,247',
  statLabel1: '社区成员',
  statValue2: '86',
  statLabel2: '成功组队',
  statValue3: '34',
  statLabel3: '创业项目',
  footerSlogan: '没有真正的垃圾，只有放错位置的资源。',
  contactEmail: 'hello@trash.center',
  contactWechat: 'TrashCenter2024',
}

onMounted(() => {
  loading.value = true
  getSiteConfig()
    .then(({ data }) => {
      form.value = { ...defaultConfig, ...data }
    })
    .finally(() => (loading.value = false))
})

function submit() {
  formRef.value?.$refs.formRef.validate().then(() => {
    saveSiteConfig(form.value).then(() => {
      $sdk.msgSuccess('保存成功')
    })
  })
}
</script>

<template>
  <div v-loading="loading">
    <BaForm ref="formRef" class="Gcard" :model="form">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Hero 首屏" name="hero">
          <BaInput v-model="form.heroBadge" label="徽章文字" maxlength="50" />
          <BaInput v-model="form.heroTitle1" label="标题第一行" maxlength="50" />
          <el-row :gutter="20">
            <el-col :span="12">
              <BaInput v-model="form.heroTitle2Accent" label="标题强调文字" maxlength="50" />
            </el-col>
            <el-col :span="12">
              <BaInput v-model="form.heroTitle2" label="标题后续文字" maxlength="50" />
            </el-col>
          </el-row>
          <BaInput v-model="form.heroDesc" type="textarea" :rows="4" label="Hero描述文字" />
          <BaFormItem prop="heroBg" label="Hero背景图">
            <BaUpload v-model:fileUrl="form.heroBg" :params="{ module: 'trash' }"></BaUpload>
          </BaFormItem>
          <BaInput v-model="form.heroPartnersText" label="伙伴描述" maxlength="20" />
        </el-tab-pane>

        <el-tab-pane label="关于我们" name="about">
          <BaInput v-model="form.aboutP1" type="textarea" :rows="3" label="段落1" />
          <BaInput v-model="form.aboutP2" type="textarea" :rows="3" label="段落2" />
          <BaInput v-model="form.aboutP3" type="textarea" :rows="3" label="段落3" />
          <BaFormItem prop="aboutImage" label="右侧配图">
            <BaUpload v-model:fileUrl="form.aboutImage" :params="{ module: 'trash' }"></BaUpload>
          </BaFormItem>
          <el-divider content-position="left">数据统计</el-divider>
          <el-row :gutter="20">
            <el-col :span="8"><BaInput v-model="form.statValue1" label="数字1" maxlength="20" /></el-col>
            <el-col :span="8"><BaInput v-model="form.statValue2" label="数字2" maxlength="20" /></el-col>
            <el-col :span="8"><BaInput v-model="form.statValue3" label="数字3" maxlength="20" /></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><BaInput v-model="form.statLabel1" label="标签1" maxlength="20" /></el-col>
            <el-col :span="8"><BaInput v-model="form.statLabel2" label="标签2" maxlength="20" /></el-col>
            <el-col :span="8"><BaInput v-model="form.statLabel3" label="标签3" maxlength="20" /></el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="运作方式" name="process">
          <BaInput v-model="form.processSubtitle" type="textarea" :rows="2" label="副标题" />
          <el-divider content-position="left">步骤 1</el-divider>
          <BaInput v-model="form.step1Title" label="标题" maxlength="50" />
          <BaInput v-model="form.step1Desc" type="textarea" :rows="3" label="描述" />
          <BaInput v-model="form.step1Meta" label="底部标签" maxlength="30" />
          <el-divider content-position="left">步骤 2</el-divider>
          <BaInput v-model="form.step2Title" label="标题" maxlength="50" />
          <BaInput v-model="form.step2Desc" type="textarea" :rows="3" label="描述" />
          <BaInput v-model="form.step2Meta" label="底部标签" maxlength="30" />
          <el-divider content-position="left">步骤 3</el-divider>
          <BaInput v-model="form.step3Title" label="标题" maxlength="50" />
          <BaInput v-model="form.step3Desc" type="textarea" :rows="3" label="描述" />
          <BaInput v-model="form.step3Meta" label="底部标签" maxlength="30" />
        </el-tab-pane>

        <el-tab-pane label="页脚" name="footer">
          <BaInput v-model="form.footerSlogan" label="口号" maxlength="200" />
          <BaInput v-model="form.footerDesc" label="描述文字" maxlength="200" />
          <BaInput v-model="form.footerNote" label="底部备注" maxlength="200" />
          <BaInput v-model="form.contactEmail" label="联系邮箱" maxlength="100" />
          <BaInput v-model="form.contactWechat" label="微信号" maxlength="100" />
        </el-tab-pane>
      </el-tabs>
    </BaForm>
    <OperateBar>
      <ElButton type="primary" @click="submit">保存配置</ElButton>
    </OperateBar>
  </div>
</template>
