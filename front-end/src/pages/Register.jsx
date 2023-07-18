import React from 'react'
import { useState,useEffect } from 'react'
import {FaUser} from 'react-icons/fa'
const Register = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:''
  })

  const {name,email,password,confirmpassword} = formData;
  const textChange =(e)=>{
    setFormData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }

  const submitted = (e) =>{
    e.preventDefault()
  }
  return (
    <>
    <section className='heading'>
      <h1>
        <FaUser/> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={submitted}>
        <div className="form-group">
        <input type="text" className="form-control"  id="name" name="name" value={name} placeholder='Enter your name'
        onChange={textChange}
        />
        </div>

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
        <input type="password" className="form-control"  id="confirmpassword" name="confirmpassword" value={name} placeholder='Enter your password again'
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

export default Register