import React, { useState } from "react";

const SubscribeBox = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Subscribe to Our CodeDevApi!
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Get the latest updates delivered to your inbox.
        </p>
        <form onSubmit={handleSubscribe}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setIsVisible(false)}
        >
          
          ×
        </button>
      </div>
    </div>
  );
};

export default SubscribeBox;
