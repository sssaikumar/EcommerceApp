import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

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

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = idNo => {
    const {cartList} = this.state

    const filteredCartList = cartList.map(each => {
      if (each.id === idNo) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: filteredCartList})
  }

  removeCartItem = idNo => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => each.id !== idNo)
    this.setState({cartList: filteredCartList})
  }

  decrementCartItemQuantity = idNo => {
    const {cartList} = this.state
    const itemObject = cartList.find(item => item.id === idNo)

    if (itemObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === idNo) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(idNo)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    let productExist = false
    const newCartList = cartList.map(each => {
      if (each.id === product.id) {
        productExist = true
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })

    if (productExist) {
      this.setState({cartList: newCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
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
    )
  }
}

export default App
