import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../App'

const PollShow = () => {
    const {id} = useParams()
    const {userState} = useContext(UserContext)
    const poll = userState.myPolls.find((ele) => {
        return ele._id === id
    })
    console.log('poll',poll)

  return (
    <div>
        <h2> poll show </h2>
        <h3>{ poll && poll.question }</h3>
        <h4> Options </h4>
        { poll && (
                <ul>
                { poll.options.map((ele) => {
                    return <li key={ele._id} > {ele.optionText}  </li>
                }) }
            </ul>
        ) }
        
    
    </div>
  )
}

export default PollShow
