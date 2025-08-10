import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import { toast } from 'react-toastify';

function Home({ cart, setCart, wishlist, addToWishlist, exchangeRate }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    axios.get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCategories(['all', ...response.data]);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const filteredProducts = products
    .filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'priceLowToHigh') return a.price - b.price;
      if (sortOption === 'priceHighToLow') return b.price - a.price;
      if (sortOption === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const inrPrice = product.price * exchangeRate;
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, priceINR: inrPrice, quantity: 1 }]);
      toast.success(`${product.title} added to cart!`, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-secondary dark:text-blue-300">Welcome to Our Store</h1>
      <div className="flex flex-wrap justify-center mb-6 space-x-4">
        <div className="flex items-center space-x-4">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-secondary"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-secondary"
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-secondary w-64"
        />
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="card">
              <div className="w-full h-48 skeleton mb-4"></div>
              <div className="h-6 skeleton mb-2"></div>
              <div className="h-4 skeleton w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} exchangeRate={exchangeRate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;