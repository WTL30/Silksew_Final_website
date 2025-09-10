import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import './Header.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 20,
    minutes: 50,
    seconds: 22
  });

  const mobileNavRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 20;
              minutes = 50;
              seconds = 22;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Touch gesture handling for mobile menu
  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    if (!mobileNav) return;

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeThreshold = 100;
      const swipeDistance = touchStartRef.current - touchEndRef.current;
      
      if (swipeDistance > swipeThreshold) {
        setShowMobileMenu(false);
      }
    };

    mobileNav.addEventListener('touchstart', handleTouchStart);
    mobileNav.addEventListener('touchmove', handleTouchMove);
    mobileNav.addEventListener('touchend', handleTouchEnd);

    return () => {
      mobileNav.removeEventListener('touchstart', handleTouchStart);
      mobileNav.removeEventListener('touchmove', handleTouchMove);
      mobileNav.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <header className="header">
      {/* Black Promotional Banner */}
      <div className="promo-banner">
        <div className="promo-content">
          <span className="promo-text">LAST DAY! 40% OFF EVERYTHING! USE CODE: SILKSEW40</span>
          <div className="promo-right">
            <span className="promo-timer">
              {timeLeft.hours.toString().padStart(2, '0')}h:
              {timeLeft.minutes.toString().padStart(2, '0')}m:
              {timeLeft.seconds.toString().padStart(2, '0')}s
            </span>
            <button className="promo-btn">Shop Now</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="header-container">
          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src="/SilkSewLogo.png" alt="SilkSew" className="logo-image" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar">
              <div className="search-input-wrapper">
                <Search className="search-icon-left" size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <Search className="camera-icon" size={16} />
              </div>
            </div>
          </div>

          {/* User Icons */}
          <div className="user-icons">
            <Link to="/account" className="icon-item">
              <User className="icon" size={20} />
            </Link>
            <Link to="/favorites" className="relative p-2 text-gray-700 hover:text-primary transition-colors">
              <Heart className="w-6 h-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="icon-item cart-icon">
              <ShoppingBag className="icon" size={20} />
              <span className="cart-count">0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          <ul className="nav-list">
            <li className="nav-item hover-dropdown">
              <a href="/tops" className="nav-link">TOPS</a>
              <div className="hover-dropdown-menu">
                <div className="hover-dropdown-content">
                  <a href="/t-shirts" className="hover-dropdown-item">T-Shirts</a>
                  <a href="/blouses-shirts" className="hover-dropdown-item">Blouses & Shirts</a>
                  <a href="/tank-tops-camis" className="hover-dropdown-item">Tank Tops & Camis</a>
                  <a href="/crop-tops" className="hover-dropdown-item">Crop Tops</a>
                  <a href="/sweaters" className="hover-dropdown-item">Sweaters</a>
                  <a href="/sweatshirts-hoodies" className="hover-dropdown-item">Sweatshirts & Hoodies</a>
                  <a href="/bodysuits" className="hover-dropdown-item">Bodysuits</a>
                </div>
              </div>
            </li>
            
            {/* Other navigation items */}
            <li className="nav-item">
              <a href="/bottoms" className="nav-link">BOTTOMS</a>
            </li>
            <li className="nav-item">
              <a href="/dresses" className="nav-link">DRESSES</a>
            </li>
            <li className="nav-item">
              <a href="/outerwear" className="nav-link">OUTERWEAR</a>
            </li>
            <li className="nav-item">
              <a href="/loungewear" className="nav-link">LOUNGEWEAR</a>
            </li>
            <li className="nav-item">
              <a href="/activewear" className="nav-link">ACTIVEWEAR</a>
            </li>
            <li className="nav-item">
              <a href="/sleepwear" className="nav-link">SLEEPWEAR</a>
            </li>
            <li className="nav-item">
              <a href="/ethnic" className="nav-link">ETHNIC</a>
            </li>
            <li className="nav-item">
              <a href="/maternity" className="nav-link">MATERNITY</a>
            </li>
            <li className="nav-item">
              <a href="/plus-size" className="nav-link">PLUS SIZE</a>
            </li>
            <li className="nav-item">
              <a href="/workwear" className="nav-link">WORKWEAR</a>
            </li>
            <li className="nav-item">
              <a href="/party-occasion" className="nav-link">PARTY & OCCASION</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div ref={mobileNavRef} className={`mobile-nav ${showMobileMenu ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <button className="close-mobile-menu" onClick={toggleMobileMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Mobile Search */}
        <div className="mobile-search">
          <div className="mobile-search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="mobile-search-input"
            />
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="mobile-nav-menu">
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <a href="/tops" className="mobile-nav-link">TOPS</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/bottoms" className="mobile-nav-link">BOTTOMS</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/dresses" className="mobile-nav-link">DRESSES</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/outerwear" className="mobile-nav-link">OUTERWEAR</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/loungewear" className="mobile-nav-link">LOUNGEWEAR</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/activewear" className="mobile-nav-link">ACTIVEWEAR</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/sleepwear" className="mobile-nav-link">SLEEPWEAR</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/ethnic" className="mobile-nav-link">ETHNIC</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/maternity" className="mobile-nav-link">MATERNITY</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/plus-size" className="mobile-nav-link">PLUS SIZE</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/workwear" className="mobile-nav-link">WORKWEAR</a>
            </li>
            <li className="mobile-nav-item">
              <a href="/party-occasion" className="mobile-nav-link">PARTY & OCCASION</a>
            </li>
          </ul>
        </nav>

        {/* Mobile User Actions */}
        <div className="mobile-user-actions">
          <Link to="/account" className="mobile-user-action">
            <User size={20} />
            <span>Account</span>
          </Link>
          <Link to="/wishlist" className="mobile-user-action">
            <Heart size={20} />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="mobile-user-action">
            <ShoppingBag size={20} />
            <span>Cart (0)</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
