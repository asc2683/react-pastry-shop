import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const Header = (props) => {
  /* from class notes 05.23.2017 */
  const { order } = props
  const { wishList } = props
  const totalItemsInBasket = order.items.length
  const totalItemsInWishList = Object.keys(wishList).map((key) => wishList[key]).length

  return (
    <header>
      <h1>
        <span className='car-word'>Pauline's</span>
        <span className='cdr-word'>Perfect Patisserie</span>
      </h1>
      <ul>
        <li><Link to={'/'}>Pastry List</Link></li>
        <li><Link to={'/orders'}>Basket {totalItemsInBasket}</Link></li>
        <li><Link to={'/account'}>Wish List {totalItemsInWishList}</Link></li>
      </ul>
    </header>
  )
}

export default Header
