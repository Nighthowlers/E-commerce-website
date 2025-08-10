import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSun, FaMoon, FaHeart, FaSignOutAlt } from 'react-icons/fa';

function Navbar({ cart, wishlist, toggleTheme, theme, username, setUsername }) {
  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <nav className="bg-primary text-white p-4 shadow-md sticky top-0 z-10 dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-accent transition">E-commerce Store</Link>
        <div className="flex items-center space-x-6 text-lg">
          {username && <span className="text-gray-200 dark:text-gray-300">Welcome, {username}</span>}
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <div className="relative group">
            <Link to="/cart" className="flex items-center hover:text-accent transition">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full px-2 text-sm">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </Link>
            <div className="absolute hidden group-hover:block bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 mt-2 right-0 w-64">
              {cart.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">Cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span className="text-gray-800 dark:text-gray-200 truncate">{item.title}</span>
                    <span className="text-gray-600 dark:text-gray-300">₹{item.priceINR.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <Link to="/wishlist" className="flex items-center hover:text-accent transition">
            <FaHeart className="text-xl" />
          </Link>
          <Link to="/checkout" className="hover:text-accent transition">Checkout</Link>
          {username ? (
            <button onClick={handleLogout} className="text-xl hover:text-accent transition">
              <FaSignOutAlt />
            </button>
          ) : (
            <Link to="/login" className="hover:text-accent transition">Login</Link>
          )}
          <button onClick={toggleTheme} className="text-xl hover:text-accent transition">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;