import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFavorites as apiGetFavorites, addToFavorites as apiToggleFavorite, removeFromFavorites as apiRemoveById, removeFromFavoritesByProduct as apiRemoveByProduct } from '../services/favoriteService';

export const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // array of product objects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoritesLoading, setFavoritesLoading] = useState({}); // map of productId -> boolean

  const refreshFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await apiGetFavorites();
      setFavorites(Array.isArray(products) ? products : []);
    } catch (e) {
      setError(e?.message || e || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // initial load from API
    refreshFavorites();
  }, [refreshFavorites]);

  const isFavorited = useCallback((productId) => {
    return favorites.some(p => p._id === productId);
  }, [favorites]);

  const toggleFavorite = useCallback(async (productId) => {
    if (!productId) return;
    setFavoritesLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const res = await apiToggleFavorite(productId);
      // Optimistically update UI by refetching to ensure consistency
      await refreshFavorites();
      return res;
    } catch (e) {
      throw e;
    } finally {
      setFavoritesLoading(prev => ({ ...prev, [productId]: false }));
    }
  }, [refreshFavorites]);

  const value = {
    favorites,
    loading,
    error,
    favoritesLoading,
    refreshFavorites,
    isFavorited,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};




