
import React, { useState } from 'react';
import Hero from '../components/Hero/Hero';
import Popular from '../components/Popular/Popular';
import OfferBanner from '../components/OfferBanner/OfferBanner';
import NewCollections from '../components/NewCollections/NewCollections';
import Login from '../pages/Login';
import CategoryCarousel from '../components/CategoryCarousal';
import MenBanner from '../components/MenBanner';
import WomenBanner from './WomenBanner';

const Shop = () => {
  return (
    <div>
      <Hero/>
      <CategoryCarousel/>
      <WomenBanner/>
      <Popular/>
      <MenBanner/>
      <OfferBanner/>
      <NewCollections/>
    </div>
  );
};

export default Shop;