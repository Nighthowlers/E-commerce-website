import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart({ cart, setCart, exchangeRate }) {
  const removeFromCart = (id) => {
    const product = cart.find((item) => item.id === id);
    setCart(cart.filter((item) => item.id !== id));
    toast.success(`${product.title} removed from cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const total = cart.reduce((sum, item) => sum + item.priceINR * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-secondary dark:text-blue-300">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4 card">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">₹{item.priceINR.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                >
                  -
                </button>
                <span className="text-gray-800 dark:text-gray-200">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total: ₹{total.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="mt-4 inline-block btn-gradient"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;