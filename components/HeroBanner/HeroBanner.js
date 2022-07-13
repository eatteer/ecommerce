import React from 'react'
import Link from 'next/link'
import { urlFor } from '../../lib/client'
import styles from './HeroBanner.module.css'

const HeroBanner = ({ data }) => {
  const {
    discount,
    largeText,
    largeText2,
    saleTime,
    smallText,
    midText,
    productSlug,
    desc,
    buttonText,
    image
  } = data
  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h5>{discount}</h5>
        <h3>{largeText}</h3>
        <h3>{largeText2}</h3>
        <p>{saleTime}</p>
      </div>

      <div className={styles.image}>
        <img src={urlFor(image)} />
      </div>

      <div className={styles.description}>
        <h5>{smallText}</h5>
        <h3>{midText}</h3>
        <p>{desc}</p>
        <Link href={`/product/${productSlug}`}>
          <button type="button">{buttonText}</button>
        </Link>
      </div>
    </div>
  )
}

export default HeroBanner