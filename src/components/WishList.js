import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../helpers'

import './WishList.css'

class WishList extends React.Component {
  render () {
    const { wishList } = this.props
    return (
      <div>
        <h1>Wish List</h1>
        {Object.keys(wishList).map((item, index) => {
          return (
            <ul key={index}>
              <li>
                {index + 1}: <Link to={`/${item}`}>{capitalizeFirstLetter(item)}</Link>
                <form onSubmit={this.props.removeWishItem}>
                  <input type='hidden' value={item} ref={(input) => {
                    this.pastryName = input}} />
                  <button>Remove</button>
                </form>
              </li>
            </ul>
          )
          }
        )}
        <form onSubmit={this.props.clearWishList}>
          <button>Clear All</button>
        </form>
      </div>
    )
  }
}

WishList.propTypes = {
  wishList: PropTypes.object.isRequired,
  removeWishItem: PropTypes.func.isRequired,
  clearWishList: PropTypes.func.isRequired
}

export default WishList
