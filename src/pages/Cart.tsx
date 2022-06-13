
import React from 'react'
import { useSelector } from 'react-redux'

import CartBlock from '../components/CartBlock'

import CartEmpty from '../components/CartEmpty'
import { selectCart } from '../redux/slices/cartSlice'


const Cart: React.FC = () => {
  const {items} = useSelector(selectCart);

  return (
    <>
      {items.length > 0 ? <CartBlock /> : <CartEmpty />}
    </>
      
  )
}

export default Cart