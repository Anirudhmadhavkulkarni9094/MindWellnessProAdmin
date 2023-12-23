import React, { useState , useEffect } from 'react'
import GoBack from '../GoBack';
import axios from 'axios'
function Forum() {
    const [blogs ,setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ANX');
    const channels = [
        { id: 1, name: 'Anxiety', description: 'Discussions about anxiety and coping mechanisms.' , category : "ANX" },
        { id: 2, name: 'Depression', description: 'Support and advice for dealing with depression.' , category : "DEP"},
        { id: 3, name: 'PTSD', description: 'Share experiences and seek support for PTSD.' , category : "PTSD"},
        { id: 4, name: 'Bipolar Disorder', description: 'Understanding and managing bipolar disorder.' , category : "BIP"},
        { id: 5, name: 'Eating Disorders', description: 'Support and recovery for eating disorders.', category : "EDIS" },
        { id: 6, name: 'OCD', description: 'Resources and strategies for managing OCD.', category : "OCD" },
        { id: 7, name: 'Substance Abuse', description: 'Recovery and discussions on substance abuse.', category : "SUBAB" },
        { id: 8, name: 'Schizophrenia', description: 'Support and understanding for schizophrenia.', category : "SCH" },
        { id: 9, name: 'ADHD', description: 'Managing ADHD and improving focus.', category : "ADHD" },
        { id: 10, name: 'Self-Harm Recovery', description: 'Support for individuals recovering from self-harm.' , category : "SHR"},
        { id: 11, name: 'Grief and Loss', description: 'Coping strategies for dealing with grief and loss.' , category : "GAL"},
        { id: 12, name: 'Autism Spectrum', description: 'Community support and resources for autism.' , category : "AUT"},
      ];
      const fetchBlogs = async (category) => {
        try {
          const response = await axios.get(`https://mindwellnesspro.onrender.com/blog-posts/${category}`);
          setBlogs(response.data);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };
    
      const handleChannelSelect = (event) => {
        const selectedChannel = event.target.value;
        const foundChannel = channels.find(channel => channel.name === selectedChannel);
        if (foundChannel) {
          setSelectedCategory(foundChannel.category);
        }
      };
    
      useEffect(() => {
        if (selectedCategory) {
          fetchBlogs(selectedCategory);
        }
      }, [selectedCategory]);
    
      return (
        <div>
          <GoBack />
          <div className='m-5'>
            <select onChange={handleChannelSelect} className='p-3 bg-blue-700 rounded-lg text-white'>
              <option value="" disabled>Select a channel</option>
              {channels.map(channel => (
                <option key={channel.id} value={channel.name}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>
    
          <div className="m-8">
  <h2 className="text-3xl font-semibold mb-6">Blogs for {selectedCategory}</h2>
  <ul className="divide-y divide-gray-300">
    {blogs.length > 0 ? blogs.map(blog => (
        <>
      <li key={blog.id} className="py-6">
        <h3 className="text-xl font-semibold mb-2">{blog.title.toUpperCase()}</h3>
        <p className="text-gray-600 leading-relaxed">{blog.content}</p>
      </li>
      <button className='bg-red-500 text-white px-3 py-2 rounded-xl mb-5'>delete</button>
        </>
      
    )) : <h1 className='font-bold text-center'>No blogs written on this topic</h1>}
  </ul>
</div>

        </div>
      );
    }
    
    export default Forum;