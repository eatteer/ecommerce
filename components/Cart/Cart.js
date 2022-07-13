import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { IoMdArrowBack, IoMdArrowRoundBack, IoMdClose } from 'react-icons/io'
import toast from 'react-hot-toast'
import { useStateContext } from '../../context/StateContext'
import { urlFor } from '../../lib/client'
import getStripe from '../../lib/getStripe'
import styles from './Cart.module.css'
import Quantity from '../Quantity/Quantity'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, showCart, setShowCart, updateProductQuantity, deleteProduct } = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const url = '/api/stripe'
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    }
    const response = await fetch(url, config)

    const data = await response.json()

    if (!response.ok) {
      console.error(data)
      return
    }

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id })

  }

  return (
    <div className={`${styles.background} ${showCart ? styles.visible : ''}`} ref={cartRef}>
      <div className={`${styles.cartContainer} ${showCart ? styles.openCart : '' }`}>
        <div className={styles.cartHeading}>
          <button onClick={() => setShowCart(false)}>
            <IoMdClose />
          </button>
          <p>Shopping Cart ({totalQuantities} items)</p>
        </div>

        <div className={styles.cartItems}>
          {cartItems.length === 0 && (
            <div className={styles.emptyCart}>
              <h3>Your shopping cart is empty</h3>
              <p>Try adding some products</p>
            </div>
          )}

          {cartItems.length > 0 && (
            <div>
              {/*  Items */}
              {cartItems.map(((item) => {
                return (
                  <div key={item._id} className={styles.item}>
                    <div className={styles.product}>
                      <div className={styles.productImage}>
                        <img src={urlFor(item.image[0])} />
                      </div>
                      <div className={styles.productDetails}>
                        <div>
                          <h3>{item.name}</h3>
                          <h4>${item.price}</h4>
                        </div>
                        <button
                          className={styles.removeItemButton}
                          onClick={() => deleteProduct(item)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                    <div className={styles.quantityContainer}>
                      <Quantity
                        quantity={item.quantity}
                        incrementQuantity={() => updateProductQuantity(item, 1)}
                        decrementQuantity={() => updateProductQuantity(item, -1)}
                      />
                    </div>
                  </div>
                )
              }))}

              {/* Subtotal footer */}
              <div>
                <h3>Subtotal: ${totalPrice}</h3>
                <button className={styles.payButton} onClick={handleCheckout}>Pay with Stripe</button>
              </div>
            </div>)}
        </div>
      </div >
    </div >
  )
}

export default Cart