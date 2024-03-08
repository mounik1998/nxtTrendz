import Popup from 'reactjs-popup'

import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'
import Checkout from '../Checkout'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, clearCart} = value
      const showEmptyView = cartList.length === 0
      console.log(cartList)
      console.log(showEmptyView)
      const removeAll = () => {
        clearCart()
      }
      let totalCount = 0
      const total = cartList.map(item => {
        totalCount += item.quantity * item.price
        return totalCount
      })
      const totalAmount = total[total.length - 1]
      return (
        <>
          <Header />
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="cart-heading-remove-all-alignment">
                  <h1 className="cart-heading">My Cart</h1>
                  <div>
                    <button
                      className="remove-all-button"
                      type="button"
                      onClick={removeAll}
                    >
                      Remove All
                    </button>
                  </div>
                </div>

                <CartListView />
                <div className="order-total-alignment">
                  <h1>Order Total</h1>
                  <h1>{totalAmount}</h1>
                </div>

                <Popup
                  modal
                  trigger={
                    <div className="checkout-button-container">
                      <button className="checkout-button" type="button">
                        Checkout
                      </button>
                    </div>
                  }
                  position="right center"
                >
                  <Checkout />
                </Popup>
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
