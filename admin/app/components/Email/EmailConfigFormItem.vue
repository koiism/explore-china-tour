<script setup lang="ts">
import type { ZodArrayDef, ZodDefaultDef, ZodObjectDef, ZodOptionalDef, ZodStringDef, ZodType } from 'zod'

const props = defineProps<{
  name: string
  schema: ZodType
  optional?: boolean
}>()
const model = defineModel<any>({
  required: true,
})
const def = computed(() => props.schema._def)
function addArrayItem() {
  model.value.push((def.value as ZodArrayDef).type.safeParse(null))
}
function removeArrayItem(index: number) {
  model.value.splice(index, 1)
}
</script>

<template>
  <AFormItem v-if="(def as ZodStringDef).typeName === 'ZodString'" :label="name" :required="!optional">
    <AInput v-model:value="model" />
  </AFormItem>
  <template v-else-if="(def as ZodOptionalDef).typeName === 'ZodOptional'">
    <EmailConfigFormItem v-model="model" :schema="(def as ZodOptionalDef).innerType" :name="name" :optional="true" />
  </template>
  <template v-else-if="(def as ZodDefaultDef).typeName === 'ZodDefault'">
    <EmailConfigFormItem v-model="model" :schema="(def as ZodOptionalDef).innerType" :name="name" :optional="optional" />
  </template>
  <div v-else-if="(def as ZodArrayDef).typeName === 'ZodArray'" border border-neutral rounded-md border-dashed p-2>
    <div v-for="(_item, index) in model" :key="index">
      <ADivider>
        {{ `${name} ${index}` }}
        <AButton type="link" danger @click="removeArrayItem(index)">
          移除
        </AButton>
      </ADivider>
      <EmailConfigFormItem v-model="model[index]" :schema="(def as ZodArrayDef).type" :name="name" :optional="optional" />
    </div>
    <AFormItem :wrapper-col="{ span: 14, offset: 4 }">
      <AButton type="dashed" block @click="addArrayItem">
        <PlusOutlined />
        Add {{ name }} item
      </AButton>
    </AFormItem>
  </div>
  <template v-else-if="(def as ZodObjectDef).typeName === 'ZodObject'">
    <ASpace direction="vertical" w-full>
      <EmailConfigFormItem
        v-for="(key, index) in Object.keys((def as ZodObjectDef).shape())"
        :key="index"
        v-model="model[key]!"
        :schema="(def as ZodObjectDef).shape()[key]!"
        :name="key"
        :optional="optional"
      />
    </ASpace>
  </template>
  <DevOnly v-else>
    {{ def }}
  </DevOnly>
</template>

<style scoped>

</style>
