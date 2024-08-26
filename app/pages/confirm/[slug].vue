<script setup lang="ts">
import { format } from 'date-fns'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { ICart, ITicket } from '~/components/business/product/ProductBook.vue'
import { type TProduct, queryProductById } from '~/sanity/queries'
import type { Json } from '~/types/supabase'

definePageMeta({
  layout: false,
})
const orderId = useRoute<'confirm-slug___en'>().params.slug
const { data: order } = await useSupabase().from('order').select().eq('orderId', orderId).single()
const productId = order?.productId
const product = ref<TProduct>()
if (productId) {
  const { data: productData } = await queryProductById(productId)
  if (productData.value) {
    product.value = productData.value
  }
}
const { t } = useI18n()
const steps = ref([
  { title: t('contact') },
  { title: t('payment') },
])
const currentStep = ref(1)
const required = {
  name: product.value?.userInfo?.includes('name'),
  passport: product.value?.userInfo?.includes('passport'),
  birthday: product.value?.userInfo?.includes('birthday'),
}
const productRequiredData = z.object({
  title: z.string(),
  ...required.name ? { name: z.string() } : {},
  ...required.passport ? { passport: z.string() } : {},
  ...required.birthday ? { birthday: z.string().date(t('invalid-date')) } : {},
})
type TProductRequiredData = Partial<z.infer<typeof productRequiredData>>
const formSchema = z.object({
  name: z.string(),
  email: z.string().email(t('invalid-email')),
  data: z.array(productRequiredData),
})
type TForm = Partial<z.infer<typeof formSchema>>
const initData = (order?.priceInfo as ITicket[])?.reduce((acc, cur) => {
  return acc.concat(Array.from({ length: cur.quantity ?? 0 }).map((_, i) => {
    return {
      title: `${cur.title} ${i + 1}`,
      ticketType: cur.title,
    }
  }))
}, [] as TProductRequiredData[])
const form = ref<TForm>(order?.userInfo as TForm ?? {
  data: initData as Required<TProductRequiredData>[],
})
const sb = useSupabase()
async function onSubmit(e: FormSubmitEvent<TForm>) {
  await sb.from('order').update({
    userInfo: e.data as Json,
  }).eq('orderId', orderId)
  currentStep.value++
}
</script>

<template>
  <main v-if="order && product" class="dot-bg">
    <LayoutNavigationProgress :steps="steps" :current="currentStep" />
    <div v-if="1 === currentStep" layout-xl flex flex-col-reverse items-start justify-between gap-8 p-4 md:flex-row md:p-8>
      <UForm :state="form" :schema="formSchema" w-full flex flex-col gap-4 md:min-w-xl md:w-auto @submit="onSubmit">
        <h1 text-subtitle>
          {{ $t('enter-your-personal-details') }}
        </h1>
        <UFormGroup :label="$t('name')" name="name" size="xl" required>
          <UInput v-model="form.name" icon="i-carbon-user" />
        </UFormGroup>
        <UFormGroup :label="$t('email')" name="email" size="xl" required>
          <UInput v-model="form.email" icon="i-carbon-email" />
        </UFormGroup>
        <UAlert :description="$t('contact-hint')" :title="$t('contact-hint-title')" icon="i-carbon-face-satisfied" />
        <h1 text-subtitle>
          {{ $t('fill-in-the-following-so-we-can-accommodate-you') }}
        </h1>
        <div v-for="(option, index) in form.data" :key="index" card-base flex flex-col gap-2 overflow-visible p-2 md:p-4>
          <h2 font-bold>
            {{ option.title }}
          </h2>
          <UFormGroup v-if="required.name" :label="$t('full-name')" :name="`data.${index}.name`" size="xl" required>
            <UInput v-model="option.name as string" icon="i-carbon-user" :placeholder="$t('full-name-desc')" />
          </UFormGroup>
          <UFormGroup v-if="required.passport" :label="$t('passport')" :name="`data.${index}.passport`" size="xl" required>
            <UInput v-model="option.passport as string" icon="i-carbon-account" />
          </UFormGroup>
          <UFormGroup v-if="required.birthday" :label="$t('birth-date')" :name="`data.${index}.birthday`" size="xl" required>
            <UiBirthDateSelector v-model="option.birthday" />
          </UFormGroup>
        </div>
        <UButton size="xl" :ui="{ rounded: 'rounded-full', font: 'font-bold' }" justify-center type="submit">
          {{ $t('go-to-payment') }}
        </UButton>
      </UForm>
      <div max-w-sm flex flex-none flex-col gap-4>
        <h1 text-subtitle>
          {{ $t('order-summary') }}
        </h1>
        <div card-base flex flex-col gap-2 rounded-xl p-2 md:p-4>
          <div flex gap-4>
            <img :src="product?.image?.[0]?.url" h-20 w-20 rounded-xl object-cover>
            <div flex flex-col gap-1>
              <div text-base font-bold>
                <UBadge color="gray" variant="solid">
                  {{ product?.category.name }}
                </UBadge>
                {{ product?.title }}
              </div>
              <div v-if="product?.city.name" text-p>
                {{ $t('city') }}:
                {{ product?.city.name }}
              </div>
            </div>
          </div>
          <UDivider />
          <div flex flex-col gap-1>
            <div flex items-center justify-start gap-2>
              <div i-carbon-ticket flex-none />
              <div text-p>
                {{ order?.ticketName }}
              </div>
            </div>
            <div flex items-center justify-start gap-2>
              <div i-carbon-time flex-none />
              <div text-p>
                {{
                  format(new Date(order.planDate), 'EEEE, MMMM do, yyyy')
                }}
                {{ $t('at') }}
                {{ order.planTime }}
              </div>
            </div>
            <div flex items-center justify-start gap-2>
              <div i-carbon-user flex-none />
              <div text-p>
                {{ (order.priceInfo as ITicket[]).map((ticket) => `${ticket.quantity} ${ticket.title}`).join(', ') }}
              </div>
            </div>
          </div>
          <UDivider />
          <div flex items-center justify-between>
            <span text-subtitle>
              {{ $t('subtotal') }}:
            </span>
            <span text-subtitle text-primary>
              {{ $t('dollar') }} {{ (order.priceInfo as ITicket[]).reduce((acc, info) => (acc + (info?.price ?? 0)), 0) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="2 === currentStep" w-full flex flex-col items-center justify-center>
      <div card-base min-w-xl flex flex-col items-center justify-center gap-4 p-4>
        <h1 text-title>
          {{ $t('payment') }}
        </h1>
        <BusinessPaypalButton :cart="(order as unknown as ICart)" w-full />
      </div>
    </div>
  </main>
  <main v-else>
    <UiNotFound />
  </main>
</template>

<style scoped>

</style>
