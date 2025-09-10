import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import "./NewCollections.css"
import axios from "axios"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import FavoriteButton from "../common/FavoriteButton"

const NewCollections = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

    const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1400 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
      items: 4,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  }

  const shortenName = (name) => (name.length > 25 ? name.substring(0, 25) + "..." : name)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.silksew.com/api/products/list")
        const fetchedProducts = Array.isArray(response.data) ? response.data : response.data.products
        setProducts(fetchedProducts)
      } catch (err) {
        setError("Failed to load products.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getImage = (images, availableColors) => {
    if (images && images.length > 0 && availableColors && availableColors.length > 0) {
      try {
        for (const color of availableColors) {
          const parsedImages = JSON.parse(images[0])
          if (parsedImages[color.name] && parsedImages[color.name].length > 0) {
            return parsedImages[color.name][0]
          }
        }
        const parsedImages = JSON.parse(images[0])
        const firstAvailableColor = Object.keys(parsedImages)[0]
        if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
          return parsedImages[firstAvailableColor][0]
        }
      } catch (error) {
        console.error("Error parsing image JSON:", error)
      }
    }
    return "https://via.placeholder.com/150"
  }

  if (loading) return <div className="nc-loading">Loading...</div>
  if (error) return <div className="nc-error">{error}</div>

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };


  return (
    <section className="nc-container">
      <h2 className="nc-title" style={{}}>New Collections</h2>
      <div className="nc-gradient-line"></div>
      <div className="nc-carousel-container">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          containerClass="nc-carousel"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="nc-carousel-dots"
          itemClass="nc-carousel-item"
        >
          {products.map((item, i) => (
            <article className="nc-product-card" key={i}>
              <div className="nc-product-image-container" style={{ position: 'relative' }}>
                <img
                  src={getImage(item.images, item.availableColors) || "/logo.png"}
                  alt={item.name}
                  className="nc-product-image"
                />
                <div 
                  className="absolute top-3 right-3 z-10" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <FavoriteButton productId={item._id} />
                </div>
              </div>
              <div className="nc-product-details">
                <h3 className="nc-brand-name">{item.brand || "BRAND"}</h3>
                <p className="nc-product-name">{shortenName(item.name)}</p>
                <div className="nc-price-container">
                  <span className="nc-current-price">₹ {item.price}</span>
                  {item.oldPrice && <span className="nc-original-price">₹ {item.oldPrice}</span>}
                </div>
                 <button 
                  onClick={() => handleViewProduct(item)} 
                  className="view-product-btn"
                >
                  View Product
                </button>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default NewCollections

