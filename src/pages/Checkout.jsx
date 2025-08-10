import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Checkout({ cart, exchangeRate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (formData.zipCode && !/^\d+$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip Code must contain only digits';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      toast.success('Order placed successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
      setFormData({ fullName: '', address: '', city: '', zipCode: '' });
      setErrors({});
      navigate('/confirmation');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.priceINR * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-secondary dark:text-blue-300">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary dark:text-blue-300">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span className="text-gray-800 dark:text-gray-200">{item.title} (x{item.quantity})</span>
                <span className="text-gray-600 dark:text-gray-300">₹{(item.priceINR * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total: ₹{total.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary dark:text-blue-300">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:text-gray-200 ${errors.fullName ? 'border-red-500' : ''}`}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:text-gray-200 ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:text-gray-200 ${errors.city ? 'border-red-500' : ''}`}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code (e.g., 12345)"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:text-gray-200 ${errors.zipCode ? 'border-red-500' : ''}`}
                />
                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
              </div>
              <button
                type="submit"
                className="w-full btn-gradient"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;