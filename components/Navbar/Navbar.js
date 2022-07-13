import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../../context/StateContext'
import Cart from '../Cart/Cart'
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai'
import styles from './Navbar.module.css'
import {GiCardAceDiamonds} from 'react-icons/gi'

const Navbar = () => {
  const { setShowCart, totalQuantities } = useStateContext()
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        <GiCardAceDiamonds/>
        <Link href="/">ace</Link>
      </h1>
      <button
        className={styles.cartIcon}
        type="button"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShoppingCart />
        <span className={styles.cartItemQty}>{totalQuantities}</span>
      </button>
      <Cart />
    </div>
  )
}

export default Navbar