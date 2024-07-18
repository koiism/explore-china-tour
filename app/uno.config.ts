import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'layout-md': 'mx-auto max-w-screen-md',
    'switch-animation': 'transition duration-300',
    'text-base': 'text-[#20202a] dark:text-[#f0f0f0] switch-animation',
    'text-title': 'text-base text-3xl md:text-5xl font-bold',
    'text-p': 'text-base text-xl font-bold font-mono md:line-height-loose line-height-normal',
    'bg-base': 'bg-[#f0f0f0] dark:bg-[#20202a] switch-animation',
    'bg-primary': 'bg-green-6 dark:bg-green-5 switch-animation',
    'card-base': 'bg-[#ffffff] dark:bg-[#17191ecc] switch-animation ring ring-1 ring-[#cedbe0] dark:ring-[#353841] rounded',
    'switch-label-base': 'bg-gray-200 dark:bg-gray-800 switch-animation',
    'switch-span-base': 'bg-white dark:bg-gray-300 switch-animation',
    'btn': 'text-base bg-primary py-2 px-4 rounded',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
