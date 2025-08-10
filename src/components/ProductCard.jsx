import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ProductCard({ product, addToCart, addToWishlist, wishlist, exchangeRate }) {
  const inrPrice = (product.price * exchangeRate).toFixed(2);
  const isInWishlist = wishlist.find((item) => item.id === product.id);

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success(`${product.title} ${isInWishlist ? 'removed from' : 'added to'} wishlist!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4 transition-transform transform hover:scale-110" />
        <h3 className="text-lg font-semibold truncate text-secondary dark:text-blue-300">{product.title}</h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-300 font-bold">₹{inrPrice}</p>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => addToCart(product)}
          className="w-3/4 btn-gradient"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className={`text-2xl ${isInWishlist ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition`}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;