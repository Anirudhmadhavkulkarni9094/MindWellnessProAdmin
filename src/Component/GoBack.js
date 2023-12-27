import React from 'react'
import {Link} from 'react-router-dom'

function GoBack() {
  return (
    <div className='p-5 flex justify-between'>
      
        <Link to='/admin' className='flex items-center gap-4 font-bold'><img src={require("../Assets/go-back.png")} className='w-6' alt='goback'></img>Go back</Link>
        <button className='px-3 py-2 bg-red-800 rounded-lg text-white border-2' onClick={()=>{sessionStorage.clear(); window.location.href = "/"}}>Sign out</button>
    </div>
  )
}

export default GoBack