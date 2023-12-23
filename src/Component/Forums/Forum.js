import React, { useState , useEffect } from 'react'
import GoBack from '../GoBack';
import axios from 'axios'
function Forum() {
    const [blogs ,setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ANX');
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    
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
    

      const handleDelete  = (id)=>{

        let confirmDelete = window.confirm(`Are you sure you want to delete?`) 
        if(confirmDelete){
          axios.delete(`http://localhost:3001/blog-posts/${id}`)
          alert("deleted successully")
        }
      }
      return (
        <div>
          <GoBack />
          <div className='m-5'>
            <select onChange={handleChannelSelect} className='p-3 bg-blue-700 rounded-lg text-white'c>
              <option value="" disabled>Select a channel</option>
              {channels.map(channel => (
                <option key={channel.id} value={channel.name}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>
          { blogs.length > 0 ? blogs.map(blog => (
                <div key={blog._id} className="bg-gray-100 m-5  relative p-4 rounded shadow mb-4">
                
                <p className='text-gray-400'>@{blog.author.slice(0,1).toUpperCase()}{blog.author.slice(1)}</p>
                <div className='flex justify-between'>
                <h1 className="text-xl mb-2 font-bold">{blog.title.toUpperCase()}</h1>
                <button
    className='bg-red-700 hover:bg-red-600 px-3 py-2 rounded-md text-white'
    onClick={() => handleDelete(blog._id)}
>
    Delete
</button>                </div>
                <p className='mb-5'>{blog.content}</p>
                <p className='absolute top-5 text-sm text-gray-400  right-10'>{new Date(blog.date).toLocaleString()}</p>
                <hr className='h-4'></hr>
                <h1 onClick={() => setSelectedBlogId(selectedBlogId === blog._id ? null : blog._id)} className='flex gap-2 items-center mt-5 font-bold text-gray-700'>
                    {selectedBlogId === blog._id ? 'Hide Comments' : 'Show Comments'} 
                    <img src={selectedBlogId === blog._id ? require("../../Assets/up.png") : require("../../Assets/down.png")} className='w-5' alt=''></img>

                </h1>
                {selectedBlogId === blog._id &&
                    <div className="mt-4">
                        {blog.comments.map(comment => (
                            
                                <div key={comment._id} className="bg-gray-200 p-2 rounded mb-2">
                                        <p className='text-md'>{comment.text}</p>
                                        <div className='flex justify-between text-sm text-gray-600'>
                                        <p>{new Date(comment.date).toLocaleString().slice(0, 10)}</p>
                                        
                                        <p>{new Date(comment.date).toLocaleString().slice(11)}</p>
                                        </div>
                                    </div>
                        ))}
                    </div>
                }
            </div>
        )) : <h1 className='text-center font-bold'>No forum blogs found for this Category</h1>}
        </div>
      );
    }
    
    export default Forum;