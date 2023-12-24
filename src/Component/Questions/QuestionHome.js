import React from 'react'
import DisplayQuestion from './DisplayQuestion'
import GoBack from '../GoBack'

function QuestionHome() {
  const auth = sessionStorage.getItem('auth');
  return (
    <div>
      <GoBack/>{auth ?
        <DisplayQuestion/> : <h1>Cannot be accessed without logging in</h1>}
    </div>
  )
}

export default QuestionHome