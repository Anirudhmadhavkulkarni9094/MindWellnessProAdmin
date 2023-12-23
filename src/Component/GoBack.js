import React from 'react'
import {Link} from 'react-router-dom'

function GoBack() {
  return (
    <div className='p-5'>
        <Link to='/admin' className='flex items-center gap-4 font-bold'><img src={require("../Assets/go-back.png")} className='w-6' alt='goback'></img>Go back</Link>
    </div>
  )
}

export default GoBack