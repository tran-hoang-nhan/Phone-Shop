import { useReducer, useEffect } from 'react';
import { CartModel } from '../models/Cart';
import { AppContext } from './AppContext';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';

const initialState = {
  products: [],
  cart: [],
  user: null,
  loading: false,
  error: null
};

const cartModel = new CartModel();

function appReducer(state, action) {
  console.log('🔄 Reducer action:', action.type, action.payload?.length || action.payload);
  
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PRODUCTS':
      console.log('📦 Setting products in state:', action.payload.length, 'items');
      return { ...state, products: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: action.payload };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const loadProducts = async (dispatch) => {
  try {
    console.log('🔄 Loading products from API...');
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const products = await productService.getProducts();
    console.log('📦 Products loaded from API:', products.length, 'items');
    
    dispatch({ type: 'SET_PRODUCTS', payload: products });
    console.log('✅ Products dispatched to state');
  } catch (error) {
    console.error('❌ Error loading products from API:', error);
    dispatch({ type: 'SET_ERROR', payload: error.message });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    
    loadProducts: () => loadProducts(dispatch),
    
    loadCart: async () => {
      try {
        const response = await cartService.getCart();
        dispatch({ type: 'SET_CART', payload: response.data?.items || [] });
      } catch (error) {
        console.error('Error loading cart:', error);
        // Fallback to localStorage
        const cart = cartModel.getCart();
        dispatch({ type: 'SET_CART', payload: cart });
      }
    },
    
    addToCart: async (product, name, price, image, quantity = 1) => {
      try {
        const response = await cartService.addToCart(product, name, price, image, quantity);
        dispatch({ type: 'ADD_TO_CART', payload: response.data?.items || [] });
      } catch (error) {
        console.error('Error adding to cart:', error);
        // Fallback to localStorage
        const cart = cartModel.addToCart(product, quantity, price);
        dispatch({ type: 'ADD_TO_CART', payload: cart });
      }
    },
    
    removeFromCart: async (productId) => {
      try {
        const response = await cartService.removeFromCart(productId);
        dispatch({ type: 'REMOVE_FROM_CART', payload: response.data?.items || [] });
      } catch (error) {
        console.error('Error removing from cart:', error);
        // Fallback to localStorage
        const cart = cartModel.removeFromCart(productId);
        dispatch({ type: 'REMOVE_FROM_CART', payload: cart });
      }
    },
    
    updateCartQuantity: async (productId, quantity) => {
      try {
        const response = await cartService.updateCartItem(productId, quantity);
        dispatch({ type: 'SET_CART', payload: response.data?.items || [] });
      } catch (error) {
        console.error('Error updating cart:', error);
        // Fallback to localStorage
        const cart = cartModel.updateQuantity(productId, quantity);
        dispatch({ type: 'SET_CART', payload: cart });
      }
    },
    
    clearCart: async () => {
      try {
        await cartService.clearCart();
        dispatch({ type: 'CLEAR_CART' });
      } catch (error) {
        console.error('Error clearing cart:', error);
        // Fallback to localStorage
        cartModel.clearCart();
        dispatch({ type: 'CLEAR_CART' });
      }
    }
  };

  // Auto-load products on mount - only once
  useEffect(() => {
    loadProducts(dispatch);
  }, []);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

