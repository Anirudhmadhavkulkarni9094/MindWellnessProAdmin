import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch suggestions when the component mounts
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('https://mindwellnesspro.onrender.com/Suggestions');
      if (response.data) {
        setSuggestions(response.data.data);
      } else {
        console.error('Failed to fetch suggestions');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div className="container  mt-8 px-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Suggestions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
          >
            <div className="bg-blue-500 p-4">
              <h3 className="text-xl font-semibold text-white">
                {suggestion.name}
              </h3>
              <p className="text-sm text-blue-200">{suggestion.email}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">{suggestion.suggestion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
