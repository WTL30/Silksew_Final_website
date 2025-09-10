
// import React, { useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import '../styles/CategoryCarousel.css';
// import carousalcat1 from "./Assets/carousalcat1.jpg";
// import carousalcat2 from "./Assets/carousalcat2.jpg";
// import carousalcat3 from "./Assets/carousalcat3.jpg";
// import carousalcat4 from "./Assets/carousalcat4.jpeg";
// import carousalcat5 from "./Assets/carousalcat5.jpeg";
// import carousalcat6 from "./Assets/carousalcat6.jpeg";
// import carousalcat7 from "./Assets/carousalcat7.jpg";
// import carousalcat8 from "./Assets/carousalcat8.jpg"

// const categories = [
//   {
//     id: 1,
//     image: carousalcat1
//   },
//   {
//     id: 2,
//     image: carousalcat2
//   },
//   {
//     id: 3,
//     image: carousalcat3
//   },
//   {
//     id: 4,
//     image: carousalcat4
//   },
//   {
//     id: 5,
//     image: carousalcat5
//   },
//   {
//     id: 6,
//     image: carousalcat6
//   },
//   {
//     id: 7,
//     image: carousalcat7
//   },
//   {
//     id: 8,
//     image: carousalcat8
//   }
// ];

// const CategoryCarousel = () => {
//   const containerRef = useRef(null);

//   const scrollLeft = () => {
//     if (containerRef.current) {
//       const scrollAmount = containerRef.current.offsetWidth / 2;
//       containerRef.current.scrollBy({
//         left: -scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       const scrollAmount = containerRef.current.offsetWidth / 2;
//       containerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   return (
//     <div className="category-carousel">
//       <div className="carousel-header">
//         <h2 className="section-title" style={{top:"20px"}}>Shop by Category</h2>
//         <div className="carousel-controls">
//           <button onClick={scrollLeft} aria-label="Scroll left">
//             <ChevronLeft size={24} />
//           </button>
//           <button onClick={scrollRight} aria-label="Scroll right">
//             <ChevronRight size={24} />
//           </button>
//         </div>
//       </div>

//       <div className="carousel-container">
//         <div 
//           ref={containerRef}
//           className="category-container"
//         >
//           {categories.map((category) => (
//             <div 
//               key={category.id} 
//               className="category-item"
//             >
//               <div className="category-image">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   loading="lazy"
//                 />
//               </div>
//               <span className="category-name">{category.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

// import React from 'react';

// const CategoryGrid = () => {
//   // Using placeholder images from a reliable source
//   const categories = [
//     {
//       id: 1,
//       name: 'SAREES',
//       image: './saree.jpg',
//     },
//     {
//       id: 2,
//       name: 'KURTIS',
//       image: './kurti.jpg',
//     },
//     {
//       id: 3,
//       name: 'DRESSES',
//       image: './dresses.jpg',
//     },
//     {
//       id: 4,
//       name: 'SLEEPWEAR',
//       image: './sleepwear.jpg',
//     },
//     {
//       id: 5,
//       name: 'MATERNITY',
//       image: './maternity.jpg',
//     },
//     {
//       id: 6,
//       name: 'WORKWEAR',
//       image: './workwear.jpg',
//     }
//   ];

//   return (
//     <div className="w-full max-w-6xl mx-auto p-6 mt-8">
//       <h2 className="text-3xl font-bold mb-10 text-left text-gray-900">SHOP BY CATEGORY</h2>

//       <div className="grid grid-cols-4 grid-rows-2 gap-5 h-[600px]">
//         {/* SAREES - Top Left */}
//         <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-lg">
//           <img 
//             src={categories[0].image} 
//             alt={categories[0].name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//             <span className="text-2xl font-bold text-white">{categories[0].name}</span>
//           </div>
//         </div>

//         {/* KURTIS - Top Right */}
//         <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-lg">
//           <img 
//             src={categories[1].image} 
//             alt={categories[1].name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//             <span className="text-2xl font-bold text-white">{categories[1].name}</span>
//           </div>
//         </div>

//         {/* DRESSES - Large Center */}
//         <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-lg">
//           <img 
//             src={categories[2].image} 
//             alt={categories[2].name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//             <span className="text-3xl font-bold text-white">{categories[2].name}</span>
//           </div>
//         </div>

//         {/* SLEEPWEAR - Bottom Left */}
//         <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-lg">
//           <img 
//             src={categories[3].image} 
//             alt={categories[3].name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//             <span className="text-2xl font-bold text-white">{categories[3].name}</span>
//           </div>
//         </div>

//         {/* MATERNITY & WORKWEAR - Bottom Right */}
//         <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-lg">
//           <div className="grid grid-rows-2 h-full gap-2">
//             {/* MATERNITY */}
//             <div className="relative">
//               <img 
//                 src={categories[4].image} 
//                 alt={categories[4].name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                 <span className="text-xl font-bold text-white">{categories[4].name}</span>
//               </div>
//             </div>

//             {/* WORKWEAR */}
//             <div className="relative">
//               <img 
//                 src={categories[5].image} 
//                 alt={categories[5].name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                 <span className="text-xl font-bold text-white">{categories[5].name}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Promotional Banner Section */}
//       <section className="promotional-banner">
//         <div className="banner-content">
//           <p className="banner-subtitle">NEW STYLES ADDED</p>
//           <h2 className="banner-title">60-80% OFF SALE</h2>
//           <button className="banner-button">SHOP NOW</button>
//         </div>
//       </section>

//       </div>
//     </div>
//   );
// };

// export default CategoryGrid;


// import React, { useState, useEffect } from 'react';
// import './Home.css';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="home">
       
          
//       {/* Shop by Category Section */}
//       <section className="shop-by-category">
//         <div className="container">
//           <h2 className="category-title">SHOP BY CATEGORY</h2>
//           <div className="category-layout">
//             {/* Large Dresses Card on Left */}
//             <div className="category-item large">
//               <div className="category-image-wrapper">
//                 <img src="/dresses.jpg" alt="Dresses" className="category-image" />
//                 <div className="category-overlay">
//                   <h3 className="category-name">Dresses</h3>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side Grid - 3x2 */}
//             <div className="category-grid-right">
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/top.jpg" alt="Tops" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Tops</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/saree.jpg" alt="Sarees" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Sarees</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/kurti.jpg" alt="Kurtis" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Kurtis</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/sleepwear.jpg" alt="Sleepwear" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Sleepwear</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/maternity.jpg" alt="Maternity" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Maternity</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/workwear.jpg" alt="Workwear" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Workwear</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Promotional Banner Section */}
//       <section className="promotional-banner">
//         <div className="banner-content">
//           <p className="banner-subtitle">NEW STYLES ADDED</p>
//           <h2 className="banner-title">60-80% OFF SALE</h2>
//           <button className="banner-button">SHOP NOW</button>
//         </div>
//       </section>

//       {/* Quote Section */}
//       <section className="quote-section">
//         <div className="quote-container">
//           <div className="quote-image-wrapper">
//             <img src="/qoute.jpg" alt="SilkSew Collection" className="quote-bg-image" />
//             <div className="quote-overlay">
//               <div className="quote-content">
//                 <h2 className="quote-title">SilkSew has arrived</h2>
//                 <p className="quote-subtitle">Presenting the exquisite winter collection</p>
//                 <button className="quote-shop-btn">Shop now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//           {/* Features Section */}
//       <section className="features-section">
//         <div className="features-container">
//           <div className="feature-item">
//             <div className="feature-icon">
//               <svg viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M20,8H4V6H20M20,18H4V12H20M22,4H2V20H22V4Z"/>
//               </svg>
//             </div>
//             <h3 className="feature-title">Free Shipping</h3>
//             <p className="feature-text">Free shipping on all orders over ₹999</p>
//           </div>
          
//           <div className="feature-item">
//             <div className="feature-icon">
//               <svg viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19M17,17H7V15H17V17M17,13H7V11H17V13M17,9H7V7H17V9Z"/>
//               </svg>
//             </div>
//             <h3 className="feature-title">15-Day Returns</h3>
//             <p className="feature-text">Easy returns within 15 days</p>
//           </div>
          
//           <div className="feature-item">
//             <div className="feature-icon">
//               <svg viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
//               </svg>
//             </div>
//             <h3 className="feature-title">Secure Payment</h3>
//             <p className="feature-text">100% secure payment options</p>
//           </div>
          
//           <div className="feature-item">
//             <div className="feature-icon">
//               <svg viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
//               </svg>
//             </div>
//             <h3 className="feature-title">24/7 Support</h3>
//             <p className="feature-text">Round the clock customer support</p>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;




import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home">
       
          
      {/* Shop by Category Section */}
      <section className="shop-by-category">
        <div className="container">
          <h2 className="category-title">SHOP BY CATEGORY</h2>
          <div className="category-layout">
            {/* Large Dresses Card on Left */}
            <div className="category-item large">
              <div className="category-image-wrapper">
                <img src="/dresses.jpg" alt="Dresses" className="category-image" />
                <div className="category-overlay">
                  <h3 className="category-name">Dresses</h3>
                </div>
              </div>
            </div>

            {/* Right Side Grid - 3x2 */}
            <div className="category-grid-right">
              <div className="category-item">
                <div className="category-image-wrapper">
                  <img src="/top.jpg" alt="Tops" className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">Tops</h3>
                  </div>
                </div>
              </div>
              <div className="category-item">
                <div className="category-image-wrapper">
                  <img src="/saree.jpg" alt="Sarees" className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">Sarees</h3>
                  </div>
                </div>
              </div>
              <div className="category-item">
                <div className="category-image-wrapper">
                  <img src="/kurti.jpg" alt="Kurtis" className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">Kurtis</h3>
                  </div>
                </div>
              </div>
              <div className="category-item">
                <div className="category-image-wrapper">
                  <img src="/sleepwear.jpg" alt="Sleepwear" className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">Sleepwear</h3>
                  </div>
                </div>
              </div>
              <div className="category-item">
                <div className="category-image-wrapper">
                  <img src="/maternity.jpg" alt="Maternity" className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">Maternity</h3>
                  </div>
                </div>
              </div>
              <div className="category-item">
                <div className="category-image-wrapper">
                  <img src="/workwear.jpg" alt="Workwear" className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">Workwear</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner Section */}
      <section className="promotional-banner">
        <div className="banner-content">
          <p className="banner-subtitle">NEW STYLES ADDED</p>
          <h2 className="banner-title">60-80% OFF SALE</h2>
          <button className="banner-button">SHOP NOW</button>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-container">
          <div className="quote-image-wrapper">
            <img src="/qoute.jpg" alt="SilkSew Collection" className="quote-bg-image" />
            <div className="quote-overlay">
              <div className="quote-content">
                <h2 className="quote-title">SilkSew has arrived</h2>
                <p className="quote-subtitle">Presenting the exquisite winter collection</p>
                <button className="quote-shop-btn">Shop now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;