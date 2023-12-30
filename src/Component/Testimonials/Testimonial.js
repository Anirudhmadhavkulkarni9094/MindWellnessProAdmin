import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoBack from '../GoBack';

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/Testimonial/")
      .then(res => {
        setTestimonials(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        setTestimonials([]);
      });
  }, []); // Pass an empty dependency array to execute the effect only once when the component mounts

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/Testimonial/${id}`);
      const updatedTestimonials = testimonials.filter(test => test._id !== id);
      setTestimonials(updatedTestimonials);
      alert("Testimonial deleted successfully");
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <GoBack/>
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {testimonials.map((test, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-3 px-6">{test.author}</td>
                <td className="py-3 px-6">{test.message}</td>
                <td className="py-3 px-6">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                    onClick={() => deleteTestimonial(test._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Testimonial;
