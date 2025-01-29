import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_e1uehvf", // Replace with your EmailJS Service ID
        "template_7kgmx0r", // Replace with your EmailJS Template ID
        e.target,
        "HbBAmmupbnwKuzfcK" // Replace with your EmailJS User ID
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          setIsSubmitted(true);
          e.target.reset(); // Clear the form
        },
        (error) => {
          console.error("Error:", error.text);
          setIsError(true);
        }
      );
  };

  return (
    <section id="contact" className="bg-gray-900 text-white py-16 px-6" data-aos="fade-down">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">
          Contact <span className="text-teal-400">Me</span>
        </h2>
      </div>

      {/* Contact Form Wrapper */}
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg" data-aos="zoom-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Icon */}
          <div className="flex items-center justify-center space-x-2 text-teal-400 text-lg">
            <i className="fa-solid fa-paper-plane"></i>
            <span className="font-medium">Message Me</span>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col space-y-4">
            {/* Name Input */}
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              className="bg-gray-700 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />

            {/* Email Input */}
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              className="bg-gray-700 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />

            {/* Message Textarea */}
            <textarea
              name="message"
              rows="4"
              placeholder="Enter your message"
              className="bg-gray-700 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-black py-3 rounded-md font-semibold hover:bg-teal-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>

      {/* Success/Failure Popup */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg text-center space-y-4">
            <h3 className="text-2xl font-bold">Thank You!</h3>
            <p>Your message has been sent successfully.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg text-center space-y-4">
            <h3 className="text-2xl font-bold text-red-500">Oops!</h3>
            <p>Something went wrong. Please try again later.</p>
            <button
              onClick={() => setIsError(false)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
