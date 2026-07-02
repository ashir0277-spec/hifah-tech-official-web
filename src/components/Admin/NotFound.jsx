// src/pages/NotFound.jsx
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Large 404 Text */}
        <h1 className="text-9xl font-semibold text-[#0873DB] tracking-wider">404</h1>
        
        {/* Subtitle */}
        <p className="mt-6 text-2xl font-semibold text-gray-800">
          Oops! Page Not Found
        </p>
        
        {/* Description */}
        <p className="mt-4 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <div className="mt-10">
          <div
            onClick={() => navigate(-1)}
            className="inline-flex items-center cursor-pointer px-6 py-3 bg-[#0873DB] text-white font-medium rounded-lg hover:bg-[#0452a1] transition duration-200 shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back
          </div>
        </div>

        {/* Optional: Fun illustration or animation can go here */}
      </div>

      {/* Footer note */}
      <p className="mt-16 text-sm text-gray-500">
        If you believe this is an error, contact support.
      </p>
    </div>
  );
};

export default NotFound;