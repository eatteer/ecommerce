import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import styles from './Quantity.module.css'

export const useQuantity = (initialQuantity = 1) => {
  const [quantity, setQuantity] = useState(initialQuantity)

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev - 1
      if (newQuantity < 1) return 1
      return newQuantity
    })
  }

  return {
    quantity,
    incrementQuantity,
    decrementQuantity
  }
}

const Quantity = ({ quantity, incrementQuantity, decrementQuantity }) => {
  return (
    <div className={styles.quantity}>
      <button
        onClick={decrementQuantity}>
        <AiOutlineMinus />
      </button>
      <p>{quantity}</p>
      <button
        onClick={incrementQuantity}>
        <AiOutlinePlus />
      </button>
    </div>
  )
}

export default Quantity