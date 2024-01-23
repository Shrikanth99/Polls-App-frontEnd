import React  from 'react'
import { useParams,Link } from 'react-router-dom'
import { useContext , useState , useEffect} from 'react'
import { PollsContext, UserContext } from '../App'
import _ from 'lodash'
import axios from '../config/axios'

const SinglePoll = () => {
    const {id} = useParams()
    const {pollsState} = useContext(PollsContext)
    const {userState, userDispatch } = useContext(UserContext)
    //console.log('PS',pollsState)
    const poll = pollsState.activePolls.find((ele) => {
        return ele._id == id
    })
    //console.log('poll',poll)

    const hasVoted = userState.myVotes.find((ele) => {
        return ele.poll == id
    })
    console.log('hasVoted',hasVoted)

    const [selectedOption,setSelectedOption] = useState(hasVoted ? hasVoted.option : '')
    const [serverErrors,setServerErrors] = useState([])

    useEffect(() => {
        setSelectedOption(hasVoted && hasVoted.option )
    },[hasVoted])

    const handleVote = async() => {
        console.log('id', selectedOption)
        try {
            const voteResponse = await axios.post(`/api/polls/vote/${id}`, { option : selectedOption }, {
                headers : { 'Authorization' : localStorage.getItem('token') }
            } )
            console.log(voteResponse.data)
            alert('Thanks for Voting')
            userDispatch({ type : 'ADD_MY_VOTES' , payload : voteResponse.data })

        } catch (e) {
            setServerErrors(e.response.data.errors)
        }
    }

    //{_.isEmpty(userState.user) ? <Link to="/login"><button>Login to vote</button></Link> : <button onClick={handleVote}>Vote</button> }
       // or
    // element variable
    const displayButton = () => {
        if(_.isEmpty(userState.user)){
            return <Link to="/login"><button>Login to vote</button></Link>
        } else {
            if(hasVoted){
                return 'your vote recorded'
            } else {
                return <button onClick={handleVote}>Vote</button>
            }
        }
    }

  return (
    <div>
      { poll ? (
        <div>
            <h1>SinglePoll component</h1>
            { poll && (
                <div>
                    <h2>{poll.question} <small> {poll.categoryId.name} </small></h2>
                    <h3>Options</h3>
                    {serverErrors.length > 0 && (
                        <div>
                            <h3>These errors prohibitted the form from being saved: </h3>
                            <ul>
                                {serverErrors.map((ele, i) => {
                                    return <li key={i}>{ele.msg}</li>
                                })}
                            </ul>
                        </div>
                    )}
                    <ul>
                        {poll.options.map((ele) => {
                            return <li key={ele._id}>
                                <input type="radio"
                                        disabled={_.isEmpty(userState.user)}
                                        name="poll"
                                        value={selectedOption} 
                                        id={ele._id}
                                        onChange={(e) => setSelectedOption(ele._id) }
                                        checked={ele._id === selectedOption }                                      

                                />
                                <label htmlFor={ele._id}>{ele.optionText} </label>
                                </li>
                        })}
                    </ul>

                    {displayButton()}

                    <p>created by {poll.creator.username} expiring on {new Date(poll.endDate).toDateString()} </p>
                </div> 
            )}
        </div>
      ) : (
        <div>
            <h2> Poll Date is Expired.... So You cant Vote </h2>
        </div>
      ) }
    </div>
  )
}

export default SinglePoll
