import React from 'react'
import PollsItem from './PollsItem'

const PollsList = (props) => {
    const {polls} = props

  return (
    <div>
      { polls.length > 0 &&(
        <ul>
        { polls.map((poll)=> {
            return <PollsItem 
                        key = {poll._id}
                       _id = {poll._id} 
                       question = {poll.question}
                       category = {poll.categoryId}
            />
        }) }
      </ul>
      ) }
    </div>
  )
}

export default PollsList