import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DumperDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dumper, reason, description, image } = location.state || {};

  if (!dumper) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg font-medium">No Dumper details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-10 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          {image ? (
            <img
              src={image}
              alt={`${dumper.name} Image`}
              className="rounded-xl max-h-96 object-contain shadow-lg"
            />
          ) : (
            <div className="w-full h-72 flex justify-center items-center bg-gray-100 text-gray-400 rounded-xl border-2 border-dashed border-gray-300">
              No Image Provided
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">{dumper.name}</h2>
          <div className="flex flex-wrap gap-6">
            <p className="text-gray-700 font-semibold bg-blue-100 px-4 py-2 rounded-full shadow-sm">
              Status: <span className="text-blue-700">{dumper.status}</span>
            </p>
            <p className="text-gray-700 font-semibold bg-green-100 px-4 py-2 rounded-full shadow-sm">
              Type: <span className="text-green-700">{dumper.type}</span>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">
              Reason / Issue
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{reason}</p>
          </div>

          {description && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">
                Detailed Description
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DumperDetails;
