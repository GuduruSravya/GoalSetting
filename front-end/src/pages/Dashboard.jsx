import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Loading from '../components/Loading'
import { getGoals,reset } from '../features/goals/goalsSlice'
import GoalItem from '../components/GoalItem'


const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)
  const {isLoading, goals, isError, message} = useSelector((state)=>state.goals)

  useEffect(() => {

    if(!user){
      navigate('/login')
    }
    else
    {
      if(isError){
        console.log(message);
      }
      
      dispatch(getGoals())
  
      return () =>{
        dispatch(reset())
      }
    }

    
  }, [user,navigate,isError,message,dispatch])
  
  if(isLoading){
    return <Loading/>
  }
  return (
    <>
    <section className='heading'>
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>
    <GoalForm/>
    <section className='content'>
      {goals.length > 0 ? <div className="goals">
        {goals.map((goal)=>(
          <GoalItem key={goal._id} goal = {goal}/>
        ))}
      </div>:<h3>Please set your goals</h3>}
    </section>
    </>
  )
}

export default Dashboard