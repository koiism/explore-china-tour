<script setup lang="ts">
import { Html, Img, Section, Tailwind } from '@vue-email/components'

const LOGO_URL = 'https://cdn.sanity.io/images/locooviw/production/4da805eb06001406e504c6174d95142ca933c63d-24x24.webp'
</script>

<template>
  <Html lang="en" dir="ltr">
    <Tailwind>
      <main class="box-border min-h-full w-full flex justify-center bg-[#F2F2F2] px-2 py-6 text-[#6d6e70]">
        <div class="relative max-w-[580px] min-w-[320px] bg-[#ffffff] p-10">
          <span class="absolute left-0 top-0 h-1 w-full bg-[#08de4a]">
            &nbsp;
          </span>
          <div class="flex items-center justify-start gap-2">
            <Img :src="LOGO_URL" alt="China Tour" class="h-6" />
            <span class="text-xl text-[#6d6e70] font-mono">
              Explore China tour
            </span>
          </div>
          <slot />
        </div>
      </main>
    </Tailwind>
  </Html>
</template>

<style scoped>

</style>
