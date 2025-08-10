import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Wishlist({ wishlist, setWishlist, addToCart, exchangeRate }) {
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    toast.success('Removed from wishlist!', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-secondary dark:text-blue-300">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="card">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} className="w-full h-48 object-contain mb-4" />
                <h3 className="text-lg font-semibold truncate text-secondary dark:text-blue-300">{item.title}</h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 font-bold">₹{item.priceINR.toFixed(2)}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => addToCart(item)}
                  className="w-3/4 btn-gradient"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;