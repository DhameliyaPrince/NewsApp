import React, { Component } from 'react'
import Buffering from './Buffering.gif'

export default class Spinner extends Component {
  render() {
    return (
      <>
        <div className='text-center'>
          <img src={Buffering} alt='Buffering' style={{height: '40px'}} />
        </div>
      </>
    )
  }
}
