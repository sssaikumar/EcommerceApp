import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const NoOfCartItems = cartList.length
      let totalAmount = 0
      cartList.forEach(eachItem => {
        totalAmount += eachItem.quantity * eachItem.price
      })

      return (
        <div className="cart-summary-bg-container">
          <div className="cart-summary-card">
            <h1>
              Order Total:
              <span className="total-price-span">Rs {totalAmount} /- </span>
            </h1>
            <p>{NoOfCartItems} Items in cart</p>
            <button className="checkout-btn" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
