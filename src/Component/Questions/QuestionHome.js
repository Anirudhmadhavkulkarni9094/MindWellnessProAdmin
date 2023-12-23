import React from 'react'
import DisplayQuestion from './DisplayQuestion'
import GoBack from '../GoBack'

function QuestionHome() {
  return (
    <div>
      <GoBack/>
        <DisplayQuestion/>
    </div>
  )
}

export default QuestionHome