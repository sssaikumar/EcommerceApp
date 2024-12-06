import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const onClickRemoveAllCartItems = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-list-view-bg-container">
          <button
            data-testid="remove"
            className="remove-all-items-btn"
            type="button"
            onClick={onClickRemoveAllCartItems}
          >
            Remove All
          </button>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
