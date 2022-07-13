import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)

  const addProduct = (product, quantity) => {
    const isProductInCart = cartItems.find(item => item._id === product._id)

    setTotalPrice((prev) => prev + product.price * quantity)
    setTotalQuantities(prev => prev + quantity)

    if (isProductInCart) {
      const updatedCartItems = cartItems.map(item => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity
          }
        }
      })
      setCartItems(updatedCartItems)
      return
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, product])
    }

    toast.success(`${quantity} ${product.name} added to the cart.`)
  }

  const updateProductQuantity = (product, quantity) => {
    const newQuantity = product.quantity + quantity

    if (newQuantity > 0) {
      setTotalPrice((prev) => prev + product.price * quantity)
      setTotalQuantities(prev => prev + quantity)

      const updatedCartItems = cartItems.map(item => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: product.quantity + quantity
          }
        }
        return item
      })

      setCartItems(updatedCartItems)
    }
  }

  const deleteProduct = (product) => {
    setTotalPrice((prev) => prev - product.price * product.quantity)
    setTotalQuantities(prev => prev - product.quantity)

    const updatedCartItems = cartItems.filter(item => {
      if (item._id !== product._id) return item
    })

    setCartItems(updatedCartItems)
  }

  const context = {
    showCart,
    setShowCart,
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    addProduct,
    updateProductQuantity,
    deleteProduct,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)