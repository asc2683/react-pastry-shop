import React from 'react'
import PropTypes from 'prop-types'
import './PastryPage.css'
import { formatPrice } from '../helpers'

class PastryPage extends React.Component {

  render () {
    const { pastry } = this.props
    return (
      <div className='pastry-page'>
        <div className='pastry-container'>
          <div className='pastry-img-container'>
            <img src={pastry.image} alt={pastry.name} />
          </div>

          <div className='pastry-info'>
            <h5 className='name'>{pastry.name}</h5>
            <form onSubmit={this.props.handleLikeSubmit}>
            <input type='hidden' value={pastry.name} ref={(input) => { this.pastryName = input }} />
            <button className='likes' type='submit'>Like {pastry.likeCount}</button>
            </form>
            <p className='description'>{pastry.description}</p>
            <ul>
              { pastry.reviews.map(function (review, index) {
                return <li key={ index }>{review.reviewText}</li>
              })}
            </ul>
            <div className='price'>{formatPrice(pastry.price)}</div>
          </div>

          <form onSubmit={this.props.addToOrder}>
            <input type='hidden' value={pastry.name} ref={(input) => { this.pastryName = input }} />
            <button type='submit'>Add to Order</button>
          </form>

          <form onSubmit={this.props.addToWishList}>
            <input type='hidden' value={pastry.name} ref={(input) => { this.pastryName = input }} />
            <button type='submit' id='addToWishListBtn'>Add to Wish List</button>
          </form>

          <br />
          <form onSubmit={this.props.handleReviewSubmit}>
            <textarea rows='5' cols='50' defaultValue='Write review here...' onChange={this.props.handleChange} />
            <br />
            <input type='hidden' value={pastry.name} ref={(input) => {this.pastryName = input}} />
            <button type='submit'>Submit Review</button>
          </form>
        </div>
      </div>
    )
  }
}

PastryPage.propTypes = {
  pastry: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  handleLikeSubmit: PropTypes.func.isRequired,
  addToWishList: PropTypes.func.isRequired,
  handleReviewSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default PastryPage
