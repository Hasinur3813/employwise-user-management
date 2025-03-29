import React from "react";
import { useNavigate } from "react-router";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-tahiti cursor-pointer text-white px-4 py-2 rounded hover:bg-bermuda"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
