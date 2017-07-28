import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './PastryList.css'

class PastryList extends React.Component {
  render () {
    const { pastries } = this.props
    return (
      <ul className='pastry-list'>
        {Object.keys(pastries).map(key => {
          const pastry = pastries[key]
          return <li key={key}>
            <Link to={`/${pastry.name}`}>{pastry.name}</Link><br />
            <form onSubmit={this.props.handleLikeSubmit}>
            <input type='hidden' value={pastry.name} ref={(input) => { this.pastryName = input }} />
            <button className='likes' type='submit'>Like {pastry.likeCount}</button> <span className="reviews">Reviews {pastry.reviews.length}</span>
            </form>
          </li>
        })}
      </ul>
    )
  }
}

PastryList.propTypes = {
  pastries: PropTypes.object.isRequired,
}

export default PastryList
