import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ setUsername }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setUsername(input.trim());
      toast.success(`Welcome, ${input.trim()}!`, {
        position: 'top-right',
        autoClose: 2000,
      });
      navigate('/');
    } else {
      toast.error('Please enter a username', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-secondary dark:text-blue-300 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-secondary"
          />
          <button
            type="submit"
            className="w-full btn-gradient"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;