<script setup lang="ts">
import { render } from '@vue-email/render'
import type { ZodType } from 'zod'

const props = defineProps<{
  schema: ZodType
  template: Component
  name: string
}>()

const email = defineModel<string>({
  required: true,
  default: '',
})

const options = ref(props.schema.safeParse({}).data)

watchEffect(() => {
  email.value = JSON.stringify(options.value, null, 2)
  render(props.template, options.value).then((res) => {
    email.value = res
  })
})
</script>

<template>
  <EmailConfigFormItem v-model="options" :schema="schema" :name="name" />
</template>

<style scoped>

</style>
