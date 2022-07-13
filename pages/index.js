import React from 'react'
import { client } from '../lib/client'
import { Product, HeroBanner } from '../components/'
import styles from './Home.module.css'

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner data={bannerData.length && bannerData[0]} />
      <div className={styles.heading}>
        <h2>Best Selling Products</h2>
      </div>
      <div className={styles.productsContainer}>
        {products?.map(product => {
          return <Product key={product._id} data={product} />
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData }
  }
}

export default Home