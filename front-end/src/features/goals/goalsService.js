import axios from 'axios'

const API_URL = '/api/goals/'


//create goal

const createGoal = async(goalData,token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,goalData,config)
    return response.data
}

const getGoals = async(token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL,config)
    return response.data
}

const deleteGoal = async(id,token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+id,config)
    return response.data
}


const updateGoal = async(body,token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL+body.id,body,config)
    return response.data
}

const goalsService = {
    createGoal,
    getGoals,
    deleteGoal,
    updateGoal
}

export default goalsService

