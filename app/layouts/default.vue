<template>
  <main class="dot-bg">
    <Navigation :scroll-bg="false" />
    <div relative text-center>
      <slot />
      <div class="mx-auto mt-5 text-center text-sm opacity-25" />
    </div>
  </main>
</template>
