import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Import the delete icon from a library like react-icons

function DisplayQuestion() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [type, setType] = useState("");
  const [model, setModel] = useState(false);
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://mindwellnesspro.onrender.com/questions');
        setAllQuestions(response.data);
        setFilteredQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (type !== "") {
      const filtered = allQuestions.filter(ques => ques.Category === type);
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(allQuestions);
    }
  }, [type, allQuestions]);

  const addQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mindwellnesspro.onrender.com/questions", {
        Question: question,
        Category: category
      });

      if (response.status === 201) {
        alert("Question added successfully");
        setModel(false);
      }
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question");
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`https://mindwellnesspro.onrender.com/questions/${id}`);
      const updatedQuestions = filteredQuestions.filter(ques => ques._id !== id);
      setFilteredQuestions(updatedQuestions);
      alert("Question deleted successfully");
    } catch (error) {
      console.error('Error deleting question:', error);
      alert("Failed to delete question");
    }
  };

  return (
    <div className='w-full'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-gray-200 p-4'>
          <thead className='bg-gray-50 p-4'>
            <tr >
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Question</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <select value={type} onChange={(e) => setType(e.target.value)} className='w-full sm:w-40'>
                  <option value="">Select Category</option>
                  <option value="anxiety disorder">Anxiety Disorder</option>
                  <option value="depression">Depression</option>
                  <option value="bipolar">Bipolar Disorder</option>
                </select>
              </th>
              <th>
                <button className='px-6 py-3 rounded-xl text-xs text-white bg-red-400 uppercase tracking-wider' onClick={() => setModel(!model)}>Add new!</button>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredQuestions.length > 0 ? filteredQuestions.map((ques) => (
              <tr key={ques._id}>
                <td className='px-6 py-4 whitespace-nowrap'>{ques.Question}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{ques.Category || '-'}</td>
                <td className='px-6 py-4 whitespace-nowrap text-right'>
                  <button className='bg-red-800 p-2 hover:bg-red-600 rounded-xl text-white' onClick={() => deleteQuestion(ques._id)}>Delete</button>
                </td>
              </tr>
            )) : <tr><td colSpan="3" className='text-center py-4'>No questions as of now</td></tr>}
          </tbody>
        </table>
      </div>
      {model ? (
        <form onSubmit={addQuestion} className='bg-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 sm:w-2/3 lg:w-1/2 m-auto rounded-lg shadow-2xl'>
          <div className='flex flex-col'>
            <label className='text-white my-2'>Question</label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder='Question'
              className='p-3 rounded-lg outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-white my-2'>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='p-3 rounded-lg outline-none'
            >
              <option value="">Select Category</option>
              <option value="anxiety disorder">Anxiety Disorder</option>
              <option value="depression">Depression</option>
              <option value="bipolar">Bipolar Disorder</option>
            </select>
          </div>
          <div className='flex justify-between'>
            <button className='bg-green-800 px-3 py-2 m-3 rounded text-white' type="submit" >Add +</button>
            <button className='bg-red-400 px-3 py-2 m-3 rounded text-white' onClick={() => setModel(false)}>Cancel</button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default DisplayQuestion;
