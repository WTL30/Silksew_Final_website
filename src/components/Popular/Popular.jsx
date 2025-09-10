
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Popular.css';
// import axios from 'axios';
// import FavoriteButton from '../common/FavoriteButton';

// const Popular = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const response = await axios.get('https://api.silksew.com/api/products/list');
//   //       const fetchedProducts = Array.isArray(response.data) ? response.data : response.data.products;
//   //       const womenProducts = fetchedProducts.filter((product) => product.category.includes('women'));
//   //       setProducts(womenProducts);
//   //     } catch (error) {
//   //       setError('Failed to load products');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://api.silksew.com/api/products/list");
//         const fetchedProducts = Array.isArray(response.data)
//           ? response.data
//           : response.data.products;

//         console.log("Fetched products:", fetchedProducts); // 👀 debug

//         const womenProducts = fetchedProducts.filter((product) =>
//           Array.isArray(product.category) &&
//           product.category.some(
//             (cat) => typeof cat === "string" && cat.toLowerCase() === "women"
//           )
//         );

//         setProducts(womenProducts);
//       } catch (error) {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);


//   const shortenName = (name) => (name.length > 25 ? name.substring(0, 25) + '...' : name);

//   const handleViewProduct = (product) => {
//     navigate(`/product/${product._id}`, { state: { product } });
//   };

//   // const getImage = (images, availableColors) => {
//   //   if (images && images.length > 0 && availableColors && availableColors.length > 0) {
//   //     try {
//   //       // Iterate over the available colors to find the first color with images
//   //       for (const color of availableColors) {
//   //         // Parse the image data for the current color
//   //         const parsedImages = JSON.parse(images[0]);
//   //         if (parsedImages[color.name] && parsedImages[color.name].length > 0) {
//   //           // Return the first image of the available color
//   //           return parsedImages[color.name][0];
//   //         }
//   //       }
//   //       // If no images found for any color, return the first image
//   //       return images[0];
//   //     } catch (error) {
//   //       console.error('Error parsing images:', error);
//   //       return images[0];
//   //     }
//   //   }
//   //   return images && images.length > 0 ? images[0] : '/logo.png';
//   // };

//   const getImage = (images, availableColors) => {
//     if (!images || images.length === 0) return '/logo.png';

//     try {
//       // Try to parse if images[0] is JSON
//       const parsed = JSON.parse(images[0]);

//       if (availableColors && availableColors.length > 0) {
//         for (const color of availableColors) {
//           if (parsed[color.name] && parsed[color.name].length > 0) {
//             return parsed[color.name][0]; // First image for that color
//           }
//         }
//       }

//       // If no color match, fallback to first key inside parsed JSON
//       const firstKey = Object.keys(parsed)[0];
//       return parsed[firstKey][0];
//     } catch (e) {
//       // Not JSON → it's already an image URL
//       return images[0];
//     }
//   };


//   const calculateDiscount = (price, oldPrice) => {
//     if (!oldPrice) return null;
//     const discount = ((oldPrice - price) / oldPrice) * 100;
//     return Math.round(discount);
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;

//   const renderProductCard = (product) => (
//     <div key={product._id} className="product-card" onClick={(e) => {
//       e.stopPropagation();
//       handleViewProduct(product);
//     }}>
//       <div className="product-image-container" style={{ position: 'relative' }}>
//         <img
//           src={getImage(product.images, product.availableColors) || '/logo.png'}
//           alt={product.name}
//           className="product-image"
//         />
//         <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
//           <FavoriteButton productId={product._id} />
//         </div>
//       </div>
//       <div className="product-details">
//         <div className="brand-name">{product.brand || 'BRAND'}</div>
//         <h3 className="product-name">{shortenName(product.name)}</h3>
//         <div className="price-container">
//           <span className="current-price">₹ {product.price}</span>
//           {product.oldPrice && (
//             <span className="original-price">₹ {product.oldPrice}</span>
//           )}
//         </div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             handleViewProduct(product);
//           }}
//           className="view-product-btn"
//         >
//           View Product
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="popular">
//       <h1 className="section-title">POPULAR IN WOMEN</h1>
//       <div className="gradient-line"></div>
//       <div className="popular-items">
//         {products.length > 0 ? (
//           products.slice(0, 4).map(renderProductCard)
//         ) : (
//           <div>No products available.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Popular;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popular.css';
import axios from 'axios';
import FavoriteButton from '../common/FavoriteButton';

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Fetch only latest 4 products directly from backend
        const response = await axios.get("https://api.silksew.com/api/products/list?limit=4");
        const fetchedProducts = Array.isArray(response.data)
          ? response.data
          : response.data.products;

        console.log("Fetched products:", fetchedProducts);

        // ✅ Filter only "women" category products
        const womenProducts = fetchedProducts.filter(
          (product) =>
            Array.isArray(product.category) &&
            product.category.some(
              (cat) => typeof cat === "string" && cat.toLowerCase() === "women"
            )
        );

        setProducts(womenProducts);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const shortenName = (name) =>
    name.length > 25 ? name.substring(0, 25) + '...' : name;

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const getImage = (images, availableColors) => {
    if (!images || images.length === 0) return '/logo.png';

    try {
      const parsed = JSON.parse(images[0]);

      if (availableColors && availableColors.length > 0) {
        for (const color of availableColors) {
          if (parsed[color.name] && parsed[color.name].length > 0) {
            return parsed[color.name][0];
          }
        }
      }

      const firstKey = Object.keys(parsed)[0];
      return parsed[firstKey][0];
    } catch (e) {
      return images[0];
    }
  };

  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice) return null;
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return Math.round(discount);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const renderProductCard = (product) => (
    <div
      key={product._id}
      className="product-card"
      onClick={(e) => {
        e.stopPropagation();
        handleViewProduct(product);
      }}
    >
      <div className="product-image-container" style={{ position: 'relative' }}>
        <img
          src={getImage(product.images, product.availableColors) || '/logo.png'}
          alt={product.name}
          className="product-image"
        />
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <FavoriteButton productId={product._id} />
        </div>
      </div>
      <div className="product-details">
        <div className="brand-name">{product.brand || 'BRAND'}</div>
        <h3 className="product-name">{shortenName(product.name)}</h3>
        <div className="price-container">
          <span className="current-price">₹ {product.price}</span>
          {product.oldPrice && (
            <span className="original-price">₹ {product.oldPrice}</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewProduct(product);
          }}
          className="view-product-btn"
        >
          View Product
        </button>
      </div>
    </div>
  );

  return (
    <div className="popular">
      <h1 className="section-title">POPULAR IN WOMEN</h1>
      <div className="gradient-line"></div>
      <div className="popular-items">
        {products.length > 0 ? (
          products.map(renderProductCard) // ✅ Already latest 4 from backend
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
};

export default Popular;



