import { CART_KEY, type ICart, defaultCart } from '../ProductBook.vue'

export function useCart() {
  const cart = inject<Ref<ICart>>(CART_KEY, defaultCart)
  return cart
}
