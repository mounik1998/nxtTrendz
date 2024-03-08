import {Component} from 'react'

import CartContext from '../../context/CartContext'
import './index.css'

const paymentMethodsList = [
  {id: 1, paymentType: 'Card', paymentDisable: false},
  {id: 2, paymentType: 'Net Banking', paymentDisable: false},
  {id: 3, paymentType: 'UPI', paymentDisable: false},
  {id: 4, paymentType: 'Wallet', paymentDisable: false},
  {id: 5, paymentType: 'Cash On Delivery', paymentDisable: true},
]

class Checkout extends Component {
  state = {
    confirmOrder: false,
    paymentType: '',
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, clearCart} = value
          let totalCount = 0
          const {confirmOrder, paymentType} = this.state
          const total = cartList.map(item => {
            totalCount += item.quantity * item.price
            return totalCount
          })
          const totalAmount = total[total.length - 1]
          console.log(totalAmount)
          const confirmOrderOfCustomer = () => {
            this.setState({confirmOrder: true})
          }
          const goHome = () => {
            clearCart()
          }
          const setRadioItem = id => {
            this.setState({paymentType: id})
          }
          return (
            <div className="checkout-container">
              {confirmOrder ? (
                <div>
                  <p>Your order has been placed successfully</p>
                  <button onClick={goHome} type="button">
                    Go Back
                  </button>
                </div>
              ) : (
                <div>
                  <h1>Cart Summary</h1>
                  <div>
                    <ul className="items-amount-container">
                      <li className="cartlist-column-names">
                        <p className="list-column-names-align">Item</p>
                        <p className="list-column-names-align">Price</p>
                        <p className="list-column-names-align">Quantity</p>
                        <p className="list-column-names-align">Total</p>
                      </li>
                      <hr />
                      {cartList.map(item => (
                        <li
                          className="cartlist-items-quantity-total"
                          key={item.id}
                        >
                          <p className="list-column-names-align">
                            {item.title}
                          </p>
                          <p className="list-column-names-align">
                            {item.price}
                          </p>
                          <p className="list-column-names-align">
                            {item.quantity}
                          </p>
                          <p className="list-column-names-align">
                            {item.price * item.quantity}
                          </p>
                        </li>
                      ))}
                      <hr />
                      <li className="total-amount">Total : {totalAmount}</li>
                    </ul>
                  </div>
                  <h1>Payment Options</h1>
                  <div>
                    <ul className="payment-list">
                      {paymentMethodsList.map(item => (
                        <li key={item.id}>
                          <input
                            disabled={item.id === 2}
                            name="payment"
                            id={item.id}
                            type="radio"
                            onChange={() => setRadioItem(item.id)}
                          />
                          <label htmlFor={item.id}>{item.paymentType}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="confirm-order-container">
                    <button
                      disabled={paymentType === '' || paymentType === 5}
                      onClick={confirmOrderOfCustomer}
                      className="confirm-order"
                      type="button"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Checkout
