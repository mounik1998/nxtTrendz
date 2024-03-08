import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const itemPresentOnCart = cartList.filter(item => item.id === product.id)
    console.log(itemPresentOnCart)
    if (itemPresentOnCart.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedCartList = cartList.map(item => {
        if (item.id === product.id) {
          const updatedQuantity = item.quantity + 1
          const newItem = {...item, quantity: updatedQuantity}
          return newItem
        }
        return item
      })
      this.setState({cartList: updatedCartList})
      //  console.log(updatedCartList)
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state

    const updatedCartList = cartList.filter(item => item.id !== id)
    this.setState({cartList: updatedCartList})
  }

  clearCart = () => {
    this.setState({cartList: []})
  }

  updateCartList = updatedCart => {
    this.setState({cartList: updatedCart})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            clearCart: this.clearCart,
            updateCartList: this.updateCartList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
