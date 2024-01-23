import React from 'react'
import { useContext } from 'react'
import { PollsContext } from '../App'
import PollsList from './PollsList'

const Home = () => {
  const {pollsState} = useContext(PollsContext)
  //console.log('ps',pollsState)

  return (
    <div>
      <h2> Home-Component </h2>
      <h3> Active Polls - { pollsState.activePolls.length } </h3>
      <PollsList polls={pollsState.activePolls} />
    </div>
  )
}

export default Home
