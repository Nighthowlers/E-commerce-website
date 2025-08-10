import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ProductDetails({ addToCart, addToWishlist, wishlist, exchangeRate }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const inrPrice = product.price * exchangeRate;
    addToCart({ ...product, priceINR: inrPrice });
    toast.success(`${product.title} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = () => {
    const inrPrice = product.price * exchangeRate;
    addToWishlist({ ...product, priceINR: inrPrice });
    toast.success(`${product.title} ${wishlist.find((item) => item.id === product.id) ? 'removed from' : 'added to'} wishlist!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-96 skeleton"></div>
          <div>
            <div className="h-8 skeleton mb-4"></div>
            <div className="h-4 skeleton mb-2"></div>
            <div className="h-4 skeleton mb-2"></div>
            <div className="h-6 skeleton w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-600 dark:text-gray-300 text-lg">Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="text-secondary hover:text-accent mb-4 inline-block dark:text-blue-300 dark:hover:text-yellow-300">&larr; Back to Home</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.image} alt={product.title} className="w-full h-96 object-contain transition-transform transform hover:scale-110" />
        <div>
          <h1 className="text-3xl font-bold mb-4 text-secondary dark:text-blue-300">{product.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">₹{(product.price * exchangeRate).toFixed(2)}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="btn-gradient"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`text-2xl ${wishlist.find((item) => item.id === product.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition`}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;