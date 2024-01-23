import { useContext } from 'react'
import {UserContext} from '../App'
function Dashboard() {
    const { userState } = useContext(UserContext)
    return (
        <div>
            <h2>Dashboard Component</h2>
            <p>Welcome, { userState.user.username }!</p>
            <b>Total polls are - {userState.myPolls.length} </b>
        </div>
    )
}

export default Dashboard