<!-- <BaseSelect class="flex-none w-[150px]" v-model="row.type" @change="(val) => saveOrUpdateFileFn(row)">
  <el-option
    v-for="(item, key) of customerStatusDict"
    :key="key"
    :label="item"
    :value="key"></el-option>
</BaseSelect>

<BaSelect
      label="商机阶段"
      prop="trackState"
      v-model="form.trackState"
      :request="getList"
      :props="{ value: 'stageVal', label: 'stageKey' }"></BaSelect>

      <BaSelect
      label="商机阶段"
      prop="trackState"
      v-model="form.trackState"
      :options="{ 1: '包含全部选中标签', 2: '包含其中一个标签', 3: '不包含选中标签' }"></BaSelect>
      -->
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    placeholder: { type: String },
    allText: { type: String },
    isAll: { type: Boolean, default: false },
    options: { type: [Array, Object], default: () => [] },
    request: {
      type: Function,
      // default: () => () => {},
    },
    queryKeywordsKey: {
      type: String,
      default: '',
    },
    query: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({ value: 'value', label: 'label' }),
    },
  },
  data() {
    return {
      loading: false,
      list: undefined,
    }
  },
  watch: {
    query() {
      this.getList()
    },
  },
  computed: {
    placeholderTransfer() {
      return (
        this.placeholder ??
        '请选择' +
          (this.$attrs.label || this.$.parent?.props?.label || '') +
          (this.queryKeywordsKey ? '，支持关键词搜索' : '')
      )
    },
    allTextTransfer() {
      return this.allText ?? '全部' + (this.$attrs.label || this.$.parent?.props?.label || '')
    },
  },
  created() {
    this.getList()
  },
  methods: {
    getList(keywords) {
      if (!this.request) {
        return
      }
      this.loading = true
      let query = Object.assign(
        { [this.queryKeywordsKey]: keywords },
        {
          pageNum: 1,
          pageSize: 1000,
        },
        this.query,
      )
      this.request(query)
        .then(({ data, rows }) => {
          let _data = data || rows
          // _data.forEach((e) => {
          //   e.value = e[this.props.value]
          //   e.label = e[this.props.label]
          // })
          this.list = Object.freeze(_data)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
<template>
  <component :is="$attrs.label || $attrs.prop ? 'BaFormItem' : 'div'" class="">
    <template #[item] v-for="(item, index) of Object.keys($slots).filter((e) => !['default'].includes(e))" :key="index">
      <slot :name="item"></slot>
    </template>

    <el-select
      class="BaSelect"
      clearable
      :placeholder="placeholderTransfer"
      :empty-values="isAll && ['', null]"
      collapse-tags
      :remote="!!request"
      reserve-keyword
      :remote-method="getList"
      :loading="loading"
      v-bind="Object.assign({}, $attrs, { style: '', class: '', id: '' })">
      <template #default>
        <el-option v-if="isAll" :label="allTextTransfer" :value="undefined"></el-option>
        <slot>
          <el-option
            v-for="(item, index) in list || options"
            :key="index"
            :label="item[props.label] || item"
            :value="item[props.value] || index"></el-option>
        </slot>
      </template>
      <template
        #[item]
        v-for="(item, index) of Object.keys($slots).filter((e) => !['default'].includes(e))"
        :key="index">
        <slot :name="item"></slot>
      </template>
    </el-select>
    <slot name="bottom"></slot>
  </component>
</template>

<style lang="scss" scoped>
.BaseSelect {
  height: var(--heightBaseSelect);
}
:deep() .el-select__wrapper {
  border: 1px solid var(--BorderBlack10);
  background-color: transparent;
  box-shadow: none;
  height: var(--heightBaseSelect);
}
</style>
