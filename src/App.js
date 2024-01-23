import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from './config/axios'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import NavBar from './components/NavBar'
import { useReducer, createContext, useEffect } from 'react'
import NewPoll from './components/NewPoll'
import Mypolls from './components/Mypolls'
import PollShow from './components/PollShow'
import userReducer from './reducers/user-reducer'
import pollsReducer from './reducers/polls-reducer'
import categoriesReduer from './reducers/categories-reducer'
import SinglePoll from './components/SinglePoll'
import SingleCategory from './components/SingleCategory'

export const UserContext = createContext()
export const PollsContext = createContext()
export const CategoriesContext = createContext()


export function App(){ 
    const [userState, userDispatch] = useReducer(userReducer, { user: {}, myPolls:[], myVotes:[] })
    const [pollsState, pollsDispatch] = useReducer(pollsReducer, { activePolls : [] } )
    const [ categoriesState, categoriesDispatch ] = useReducer(categoriesReduer, { data:[], selectedPolls : []  } )

    useEffect(() => {
        if(localStorage.getItem('token')) {
            (async () => {
                try {
                    const response = await axios.get('/api/users/account', {
                        headers: {
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    userDispatch({ type: 'USER_LOGIN', payload: response.data })
                    const pollsResponse = await axios.get('/api/polls/mypolls',{
                        headers : {
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    userDispatch({type: 'SET_MY_POLLS', payload: pollsResponse.data })

                    const voteResponse = await axios.get('/api/votes/myvotes', {
                        headers : { 'Authorization' : localStorage.getItem('token') }
                    } )
                    userDispatch({ type : 'SET_MY_VOTES', payload : voteResponse.data  })

                } catch(e){
                    alert(e.message)
                }
            })()
        }
        (async() => {
            try {
                const responses = await Promise.all([await axios.get('/api/polls/active'), await axios.get('/api/categories')]) 
                //console.log('res',response)
                const polls = responses[0].data
                console.log(polls)
                const categories = responses[1].data
                pollsDispatch({ type : 'SET_ACTIVE_POLLS', payload : polls })
                categoriesDispatch({ type: 'SET_CATEGORIES', payload : categories  })
            } catch (e) {
                console.log('err',e)
            }
        })()
    }, [])
    
    return (
        <BrowserRouter>
            <UserContext.Provider value={{userState, userDispatch }}>
                <PollsContext.Provider value={{  pollsState, pollsDispatch}} >
                    <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch}}>
                    <div>
                        <h1>Polling App</h1>
                        <NavBar /> 


                        <Routes>
                            <Route path="/" element={<Home />}/> 
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/polls/new' element={<NewPoll/>} />
                            <Route path='/polls/my-polls' element={<Mypolls/>} />
                            <Route path='/mypolls/:id' element={<PollShow/>} />
                            <Route path="/polls/:id" element={<SinglePoll />} />
                            <Route path='polls/category/:name' element={<SingleCategory/>} />
                        </Routes>
                    </div> 
                    </CategoriesContext.Provider>
                </PollsContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    )
}