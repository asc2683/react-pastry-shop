import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatPrice, capitalizeFirstLetter } from '../helpers'

import './OrderBasket.css'

class OrderBasket extends React.Component {
  render () {
    const { items, totalPrice } = this.props.order

    const pastryMap = items.reduce((acc, pastry) => {
      const p = acc.get(pastry.name)
      const countPastry = Object.assign({}, pastry,
         p ? { quantity: p.quantity + 1 } : { quantity: 1 }
      )
      return acc.set(pastry.name, countPastry)
    }, new Map())

    const orderArray = Array.from(pastryMap.values())

    return (
      <div>
      <h1>Order Basket</h1>
      {orderArray.map((item, index) => {
        return (
          <ul key={index}>
            <li>
              Item: <Link to={`/${item.name}`}>{capitalizeFirstLetter(item.name)}</Link>,
              Quantity: {item.quantity},
              Price: {formatPrice(item.price)}

              <form onSubmit={this.props.removeOrder}>
                <input type='hidden' value={item.name} ref={(input) => {this.pastryName = input}} />
                <button>Remove</button>
              </form>
              <form onSubmit={this.props.addToOrder}>
                <input type='hidden' value={item.name} ref={(input) => {this.pastryName = input}} />
                <button>Add</button>
              </form>
            </li>
          </ul>
          )
        })
      }
      <p>Total: {formatPrice(totalPrice)}</p>
      <button onClick={this.props.clearOrder}>Clear Order</button>
      </div>
    )
  }
}

OrderBasket.propTypes = {
  order: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeOrder: PropTypes.func.isRequired
}

export default OrderBasket
