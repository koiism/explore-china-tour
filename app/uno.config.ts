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
    'layout-xl': 'mx-auto max-w-screen-xl',
    'switch-animation': 'transition duration-300',
    'text-primary': 'text-green-5 dark:text-green-4 switch-animation',
    'text-common': 'text-[#20202a] dark:text-[#f0f0f0] transition duration-100',
    'text-p': 'text-[##2d2d3b] dark:text-[#cccccc] text-sm md:line-height-loose line-height-normal',
    'text-btn': 'text-[#f0f0f0] dark:text-[#20202a] text-sm font-bold transition duration-100',
    'text-subtitle': 'text-common text-xl md:text-2xl font-bold text-start',
    'text-title': 'text-common text-3xl md:text-5xl font-bold text-start',
    'text-section-title': 'text-common text-xl md:text-2xl font-bold text-start relative before:content-empty before:absolute before:h-full before:w-1 before:bg-primary before:left-0 pl-3',
    'bg-base': 'bg-[#ffffff] dark:bg-[#17191e] switch-animation',
    'bg-disable': 'bg-[#ebeef1] dark:bg-[#303131] switch-animation',
    'bg-primary': 'bg-green-5 dark:bg-green-4 switch-animation',
    'card-base': 'bg-[#ffffff] dark:bg-[#17191ecc] switch-animation ring ring-1 ring-[#cedbe0] dark:ring-[#353841] rounded',
    'card-sub': 'pb-4 mb-0 border-b border-[#cedbe0] dark:border-[#353841]',
    'switch-label-base': 'bg-gray-200 dark:bg-gray-800 switch-animation',
    'switch-span-base': 'bg-white dark:bg-gray-300 switch-animation',
    'btn': 'text-btn bg-primary py-2 px-4 rounded-full',
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
