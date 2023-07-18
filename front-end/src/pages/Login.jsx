import React,{useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Loading from '../components/Loading';
import { login,reset } from '../features/auth/authSlice'
const Login = () => {
  const [formData, setFormData] = useState({
   
    email:'',
    password:'',
    
  })

  const {email,password} = formData;

  const nav = useNavigate()
  const dispatch = useDispatch()

  const {user,isLoading,isSuccess,isError,message} = useSelector(
    (state) => state.auth
  )

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      nav('/');
    }

    dispatch(reset())
  },[user,isError,message,isSuccess,nav,dispatch])

  const textChange =(e)=>{
    setFormData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }

  const submitted = (e) =>{
    e.preventDefault()

    const userData={
      email,
      password,
    }
    dispatch(login(userData))
  }

  if(isLoading){
    return <Loading/>
  }
  return (
    <>
    <section className='heading'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Please login to your account</p>
    </section>

    <section className="form">
      <form onSubmit={submitted}>
        

        <div className="form-group">
        <input type="email" className="form-control"  id="email" name="email" value={email} placeholder='Enter your email'
        onChange={textChange}
        />
        </div>

        <div className="form-group">
        <input type="password" className="form-control"  id="password" name="password" value={password} placeholder='Enter your password'
        onChange={textChange}
        />
        </div>

        
        <div className="form-group">
          <button type='submit' className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Login