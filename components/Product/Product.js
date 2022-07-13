import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styles from './Product.module.css'

const Product = ({ data }) => {
  const { image, name, slug, price } = data
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={urlFor(image && image[0])} />
          </div>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product