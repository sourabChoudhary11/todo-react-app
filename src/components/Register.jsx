import React, { useContext, useState } from 'react'
import "../styles/login.css"
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { DataContext, ourServer } from '../index'

const Register = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(DataContext);

    const { name, email, password } = form;

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${ourServer}/users/new`, {
                name,
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"http://localhost:3000",
                    "Access-Control-Allow-Method": "POST"
                },
                withCredentials: true,
            })
            console.log(response);
            console.log(form);
            toast.success(response.data.message)
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
        setForm({
            name: "",
            email: "",
            password: ""
        })
    }

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    if(isAuthenticated) return <Navigate to={"/"} />

    return <form onSubmit={submitHandler}>
        <h2>Sign up to create your account</h2>
        <input type='text' value={name} onChange={changeHandler} name="name" placeholder='NAME' required />
        <input type='text' value={email} onChange={changeHandler} name="email" placeholder='EMAIL' required />
        <input type='password' value={password} onChange={changeHandler} name='password' placeholder='PASSWORD' required />
        <button type='submit' disabled={loading}>Sign Up</button>
        <h3>Or</h3>
        <Link to="/login"><button type='submit'>Log In</button></Link>
    </form>
}

export default Register
