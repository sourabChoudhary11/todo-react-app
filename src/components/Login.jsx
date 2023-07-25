import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import "../styles/login.css"
import { DataContext, ourServer } from '../index'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =useContext(DataContext);

  const { email, password } = form;

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${ourServer}/users/login`, {
        "email": email,
        "password": password
      }, {
        headers:{
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Method": "POST"  
        },
        withCredentials: true
      })
      setForm({
        email: "",
        password: ""
      })
      toast.success(response.data.message)
      setLoading(false);
      setIsAuthenticated(true);
      
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false);
    }
  }

  if (isAuthenticated) return <Navigate to={"/"} />

  return <form onSubmit={submitHandler}>
    <h2>Log in in your account</h2>
    <input type='text' value={email} onChange={changeHandler} name="email" placeholder='EMAIL' required />
      <input type='password' value={password} onChange={changeHandler} name='password' placeholder='PASSWORD' required />
      <button type='submit' disabled={loading}>Log In</button>
      <h3>Or</h3>
    <Link to="/register"><button type='submit'>Sign Up</button></Link>
  </form>
}

export default Login
