import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {deleteCartItem, cartList, updateCartList} = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      const onDeleteCartItem = () => {
        deleteCartItem(id)
      }
      const increaseQuantity = () => {
        // console.log(cartList)

        const updatedCartList = cartList.map(item => {
          if (item.id === id) {
            const updatedQuantity = item.quantity + 1
            const newItem = {...item, quantity: updatedQuantity}
            return newItem
          }
          return item
        })

        //  console.log(updatedCartList)
        updateCartList(updatedCartList)
      }
      const decreaseQuantity = () => {
        // console.log(cartList)

        const updatedCartList = cartList.map(item => {
          if (item.id === id) {
            const updatedQuantity = item.quantity === 0 ? 0 : item.quantity - 1
            const newItem = {...item, quantity: updatedQuantity}
            return newItem
          }
          return item
        })

        // console.log(updatedCartList)
        updateCartList(updatedCartList)
      }
      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                data-testid="minus"
                type="button"
                className="quantity-controller-button"
                onClick={decreaseQuantity}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                data-testid="plus"
                type="button"
                className="quantity-controller-button"
                onClick={increaseQuantity}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            data-testid="remove"
            className="delete-button"
            type="button"
            onClick={onDeleteCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
