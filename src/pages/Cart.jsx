
import React from 'react'
import { useSelector } from 'react-redux'

import CartBlock from '../components/CartBlock'

import CartEmpty from '../components/CartEmpty'


const Cart = () => {
  const items = useSelector(state => state.cart.items)

  return (
    <>
      {items.length > 0 ? <CartBlock /> : <CartEmpty />}
    </>
      
  )
}

export default Cart