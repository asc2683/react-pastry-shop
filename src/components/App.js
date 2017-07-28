import React from 'react'
import './App.css'

import Header from './Header'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header order={this.props.order} wishList={this.props.wishList} />
        <div className='main'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
