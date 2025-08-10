import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

function OrderConfirmation({ cart, setCart }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  }, [setCart]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    toast.success(`Thank you for your ${rating}-star rating and feedback!`, {
      position: 'top-right',
      autoClose: 2000,
    });
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <div className="bg-green-100 dark:bg-gray-700 p-8 rounded-lg shadow-md animate-fadeIn">
        <h1 className="text-4xl font-bold text-primary mb-4 dark:text-green-400">Order Placed Successfully! ✅</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Thank you for your purchase. Your order details have been sent to your email (mock).</p>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-secondary dark:text-blue-300">Rate Your Experience</h2>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-2xl cursor-pointer ${star <= rating ? 'text-accent' : 'text-gray-400'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <form onSubmit={handleSubmitFeedback}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="mt-2 btn-gradient"
            >
              Submit Feedback
            </button>
          </form>
        </div>
        <Link
          to="/"
          className="inline-block btn-gradient"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;