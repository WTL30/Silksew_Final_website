"use client"

import { useState, useRef, useEffect, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Search, User, Heart, ShoppingBag } from "lucide-react"
import { useFavorites } from "../../context/FavoritesContext"
import { ShopContext } from "../../context/ShopContext"
import FavoriteButton from '../common/FavoriteButton';   
import logo from "../../components/Assets/siksewmodified.png"   
import "./Header.css"

const Navbar = () => {
  const { products } = useContext(ShopContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 20, minutes: 44, seconds: 40 })
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const mobileNavRef = useRef(null)
  const { favorites } = useFavorites()
  const navigate = useNavigate()
  const location = useLocation()
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0

  const womenCategories = [
    "Traditional Wear",
    "Casual Wear",
    "Formal Wear",
    "Ethnic Wear",
    "Street Style",
    "Smart Casuals",
    "Athleisure",
    "Summer Wear",
    "Winter Wear",
    "Party Wear",
    "Wedding Wear",
    "Indo-Western",
    "Loungewear",
    "Vacation Wear",
    "Festive Wear",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else {
          seconds = 59
          if (minutes > 0) minutes--
          else {
            minutes = 59
            if (hours > 0) hours--
            else hours = 20
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setShowMobileMenu(false)
      }
    }
    if (showMobileMenu) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showMobileMenu])

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!selectedCategory) {
        setCategoryProducts([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch("https://api.silksew.com/api/products")

        if (response.ok) {
          const data = await response.json()
          const fetchedProducts = Array.isArray(data) ? data : data.products

          const womenProducts = fetchedProducts.filter((product) => product.category.includes("women"))

          const filtered = womenProducts.filter((product) => {
            const productSubcategories = Array.isArray(product.subcategory)
              ? product.subcategory.map((sub) => sub.toLowerCase())
              : []
            return productSubcategories.includes(selectedCategory.toLowerCase())
          })

          setCategoryProducts(filtered)
        } else {
          console.error("Failed to fetch products")
          setCategoryProducts([])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        setCategoryProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [selectedCategory])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      return
    }

    const results = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(results)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      navigate(`/product/${searchResults[0]._id}`)
      setSearchQuery("")
      setSearchResults([])
    }
  }

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`)
    setSearchQuery("")
    setSearchResults([])
  }

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  // ✅ Helper function to safely extract image URL
  const getProductImage = (product) => {
    try {
      if (Array.isArray(product.images) && product.images.length > 0) {
        const firstImage = product.images[0]
        if (typeof firstImage === "string" && firstImage.startsWith("http")) {
          return firstImage
        }
        if (typeof firstImage === "string") {
          const parsed = JSON.parse(firstImage)
          const firstKey = Object.keys(parsed)[0]
          return parsed[firstKey][0]
        }
      }
      return "https://via.placeholder.com/200"
    } catch (error) {
      console.error("Error parsing product image:", error)
      return "https://via.placeholder.com/200"
    }
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Promo Banner */}
      <div style={{ backgroundColor: "#000", color: "#fff", padding: "12px 0", fontSize: "13px", fontWeight: "500" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span>LAST DAY! 40% OFF EVERYTHING! USE CODE: SILKSEW40</span>
            <span style={{ fontWeight: "600" }}>
              {timeLeft.hours.toString().padStart(2, "0")}h:
              {timeLeft.minutes.toString().padStart(2, "0")}m:
              {timeLeft.seconds.toString().padStart(2, "0")}s
            </span>
          </div>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              border: "1px solid #fff",
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#fff"
              e.target.style.color = "#000"
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent"
              e.target.style.color = "#fff"
            }}
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* ✅ Header with Logo, Searchbar, Icons */}
      <div style={{ backgroundColor: "#fff", padding: "20px 0", borderBottom: "1px solid #f0f0f0" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          {/* Logo */}
          <div style={{ flexShrink: "0" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img src={logo} alt="Logo" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
            </Link>
          </div>

          {/* Searchbar */}
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              style={{
                width: "100%",
                padding: "10px 40px 10px 15px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            />
            <Search size={18} style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)" }} />

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  zIndex: 10,
                }}
              >
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => handleSelectProduct(product._id)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile, Favorites, Cart */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/profile"><User size={22} /></Link>
            <Link to="/favorites" style={{ position: "relative" }}>
              <Heart size={22} />
              {favoritesCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  background: "red",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "10px",
                }}>{favoritesCount}</span>
              )}
            </Link>
            <Link to="/cart"><ShoppingBag size={22} /></Link>
          </div>
        </div>

        {/* ✅ Category Slider */}
        <div style={{ marginTop: "15px", display: "flex", gap: "15px", overflowX: "auto", padding: "10px 20px", whiteSpace: "nowrap" }}>
          {womenCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={{
                padding: "8px 16px",
                border: selectedCategory === cat ? "2px solid #000" : "1px solid #ccc",
                borderRadius: "20px",
                background: "#fff",
                cursor: "pointer",
                fontWeight: selectedCategory === cat ? "600" : "400",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Category Products only on Shop ("/") */}
      {location.pathname === "/" && selectedCategory && (
        <div style={{ backgroundColor: "#f8f9fa", padding: "20px 0", borderBottom: "1px solid #e5e7eb" }}>
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading products...</p>
          ) : categoryProducts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                padding: "0 20px",
              }}
            >
              {categoryProducts.map((product) => (
                <div key={product._id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", position: "relative" }}>
                  {/* ✅ Favorite Icon Top Right */}
                  <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
                    <FavoriteButton productId={product._id} />
                  </div>

                  <Link to={`/product/${product._id}`}>
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <h4 style={{ marginTop: "10px", fontSize: "14px" }}>{product.name}</h4>
                    <p style={{ marginTop: "5px", fontSize: "13px", fontWeight: "600" }}>₹{product.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar





