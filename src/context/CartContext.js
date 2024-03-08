import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  clearCart: () => {},
  updateCartList: () => {},
})

export default CartContext
