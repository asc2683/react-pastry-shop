import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Switch
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import OrderBasket from './components/OrderBasket'
import WishList from './components/WishList'
import NotFound from './components/NotFound'
import { getTotalPrice } from './helpers'


class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      pastries,
      order: {
        items: [],
        totalPrice: 0
      },
      wishList: {}
    }
    this.addToOrder = this.addToOrder.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
    this.removeOrder = this.removeOrder.bind(this)
    this.handleLikeSubmit = this.handleLikeSubmit.bind(this)
    this.addToWishList = this.addToWishList.bind(this)
    this.removeWishItem = this.removeWishItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this)
  }

  addToOrder (e) {
    e.preventDefault()
    /* from class notes 05.08.2017 */
    const input = e.target.querySelector('input')
    const value = input.value
    const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastries.find(p => p.name === value)
    const order = Object.assign({}, this.state.order)

    order.items.push(pastry)
    order.totalPrice = getTotalPrice(order.items)

    this.setState({
      order
    })
  }

  /* clear all items */
  clearOrder () {
    this.setState({
      order: {
        items: [],
        totalPrice: 0
      }
    })
  }

  /* remove single item */
  removeOrder (e) {
    e.preventDefault()
    const input = e.target.querySelector('input').value
    const itemsArray = this.state.order.items

    /*
    https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
     */

    for (var i =0; i < itemsArray.length; i++) {
      if (itemsArray[i].name === input) {
        itemsArray.splice(i,1)
        break
      }
    }

    const totalPrice = getTotalPrice(itemsArray)

    this.setState({
      order: {
        items: itemsArray,
        totalPrice: totalPrice
      }
    })
  }

  /* handle pastry likes */
  handleLikeSubmit (e) {
    e.preventDefault()
    const input = e.target.querySelector('input')
    const value = input.value
    const pastryItems = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastryItems.find(p => p.name === value)
    pastry.likeCount += 1

    this.setState({
      pastries
    })
  }

  /* add to wish list */
  addToWishList (e) {
    e.preventDefault()
    const input = e.target.querySelector('input')
    const value = input.value
    const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastries.find(p => p.name === value)
    if (!pastry) return

    const wishList = Object.assign({}, this.state.wishList)
    const savedPastry = Object.assign({}, wishList[pastry.name])

    if(savedPastry.name) {
      /* toodo disable btn react via state */

      const btn = document.getElementById('addToWishListBtn')
      btn.setAttribute('disabled', '')
      alert (savedPastry.name + ' is already in your wish list!')
    } else {
      wishList[pastry.name] = Object.assign({}, pastry)
    }

    this.setState({
      wishList
    })
  }

  /* remove single wish item */
  removeWishItem (e) {
    e.preventDefault()
    const input = e.target.querySelector('input')
    const value = input.value
    const wishList = Object.assign({}, this.state.wishList)

    if (wishList.hasOwnProperty(value)) {
      delete wishList[value]
    } else {
      return
    }

    this.setState({
      wishList
    })
  }

  /* clear wish list */
  clearWishList () {
    this.setState({
      wishList: {}
    })
  }

  /* handle review form */
  handleChange (e) {
    e.preventDefault()
    this.setState({
      value: e.target.value
    })
  }

  /* handle pastry reviews */
  handleReviewSubmit (e) {
    e.preventDefault()
    const input = e.target.querySelector('input')
    const value = input.value
    const pastryItems = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastryItems.find(p => p.name === value)
    const pastryReview = {}

    pastryReview.reviewText = this.state.value
    pastry.reviews.push(pastryReview)

    this.setState({
      pastries
    })
  }

  render () {
    return (
      <Router history={hashHistory}>
        <App order={this.state.order} wishList={this.state.wishList}>
          <Switch>
            <Route exact path='/' render={props => (
              <PastryList pastries={this.state.pastries} handleLikeSubmit={this.handleLikeSubmit} />
            )} />
            <Route path='/orders' render={props => (
              <OrderBasket order={this.state.order} clearOrder={this.clearOrder} removeOrder={this.removeOrder} addToOrder={this.addToOrder}/>
            )} />
            <Route path='/account' render={props => (
              <WishList wishList={this.state.wishList} removeWishItem={this.removeWishItem} clearWishList={this.clearWishList} />
            )} />
            <Route path='/:pastry' render={props => {
              const pastryName = props.match.params.pastry
              const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
              const pastry = pastries.find(p => p.name === pastryName)
              if (pastry) {
                return (
                  <PastryPage pastry={pastry} addToOrder={this.addToOrder} handleLikeSubmit={this.handleLikeSubmit} handleChange={this.handleChange} handleReviewSubmit={this.handleReviewSubmit} addToWishList={this.addToWishList} />
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }
            }} />
          </Switch>
        </App>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
