import axios from 'axios'

const API_URL = '/api/users/'

//http call to register user
const register = async (userData) =>{
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//http call to login user
const login = async (userData) =>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const logout = async() =>{
    await localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService