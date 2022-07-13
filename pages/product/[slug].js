import React from 'react'
import { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { useStateContext } from '../../context/StateContext'
import { Product } from '../../components'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styles from './ProductDetail.module.css'
import Quantity, { useQuantity } from '../../components/Quantity/Quantity'

const ProductDetail = ({ product, similarProducts }) => {
  const [currentIndexImage, setIndex] = useState(0)
  const { image, name, details, price } = product
  const { addProduct, setShowCart } = useStateContext()
  const { quantity, incrementQuantity, decrementQuantity } = useQuantity(1)


  const handleBuyNow = () => {
    addProduct(product, quantity)
    setShowCart(true)
  }

  return (
    <>
      <div className={styles.container}>

        {/* Images */}
        <div>
          <div className={styles.mainImage}>
            <img src={urlFor(image && image[currentIndexImage])} />
          </div>
          <div className={styles.smallImages}>
            {image?.map((item, index) => (
              <div key={index} className={styles.smallImage}>
                <img
                  src={urlFor(item)}
                  onMouseEnter={() => setIndex(index)}
                  onClick={() => setIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className={styles.details}>
            <h1>{name}</h1>
            <div className={styles.reviews}>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <span>
                (20)
              </span>
            </div>
            <h3>${price}</h3>
            <p>{details}</p>
          </div>

          <div className={styles.quantityContainer}>
            <Quantity
              quantity={quantity}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          </div>

          <div className={styles.actionButtons}>
            <button
              onClick={() => addProduct(product, quantity)}>
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>


      </div>
      <div className={styles.mayLike}>
        <h2>You may also like</h2>
        <div className={styles.marquee}>
          <div className={`${styles.maylikeProducts} ${styles.track}`}>
            {similarProducts.map((product) => (
              <Product key={product._id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const productsQuery = `*[_type == "product"] {
    slug {
      current
    }
  }`
  const products = await client.fetch(productsQuery)

  const paths = products.map(product => {
    return {
      params: {
        slug: product.slug.current
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params

  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`
  const product = await client.fetch(productQuery)

  const similarProductsQuery = `*[_type == "product"]`
  const similarProducts = await client.fetch(similarProductsQuery)

  return {
    props: { product, similarProducts }
  }
}

export default ProductDetail