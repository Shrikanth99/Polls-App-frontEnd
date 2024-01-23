import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'
import PollsList from './PollsList'

//{ userState.myPolls.length > 0 ? <b> Your polls- {userState.myPolls.length} </b> : <b> { `sorry.. ${userState.user.username} , you have not craeted any polls ` } </b> }

const Mypolls = () => {
    const {userState} = useContext(UserContext)
    //console.log('us',userState)
  return (
    <div>
      <h2>My-Polls</h2> 
      <h4>Total polls { userState.myPolls.length } </h4> 
      <PollsList polls={userState.myPolls}/> 
      
    </div>
  )
}

export default Mypolls
