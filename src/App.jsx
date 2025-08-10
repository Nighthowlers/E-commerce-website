import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Login from './pages/Login.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const exchangeRate = 83;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const savedUsername = localStorage.getItem('username') || '';
    setCart(savedCart);
    setWishlist(savedWishlist);
    setUsername(savedUsername);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('username', username);
  }, [cart, wishlist, username]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1, priceINR: product.price * exchangeRate }]);
    }
    toast.success(`${product.title} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const addToWishlist = (product) => {
    const existingItem = wishlist.find((item) => item.id === product.id);
    if (!existingItem) {
      setWishlist([...wishlist, { ...product, priceINR: product.price * exchangeRate }]);
    } else {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Navbar cart={cart} wishlist={wishlist} toggleTheme={toggleTheme} theme={theme} username={username} setUsername={setUsername} />
        <AnimatePresence mode="wait">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home cart={cart} setCart={setCart} wishlist={wishlist} addToWishlist={addToWishlist} exchangeRate={exchangeRate} />} />
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} exchangeRate={exchangeRate} />} />
              <Route path="/checkout" element={<Checkout cart={cart} exchangeRate={exchangeRate} />} />
              <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} exchangeRate={exchangeRate} />} />
              <Route path="/confirmation" element={<OrderConfirmation cart={cart} setCart={setCart} />} />
              <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} addToCart={addToCart} exchangeRate={exchangeRate} />} />
              <Route path="/login" element={<Login setUsername={setUsername} />} />
            </Routes>
          </div>
        </AnimatePresence>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;