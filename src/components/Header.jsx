import React, { useContext } from 'react'
import "../styles/header.css"
import { Link } from 'react-router-dom'
import { DataContext, ourServer } from '../index'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Header = () => {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUser } = useContext(DataContext)

    const submitHandler = async (e) => {
        setLoading(true);
        try {
            await axios.get(`${ourServer}/users/logout`, {
                withCredentials: true,
            })
            toast.success("Successfully Logged out")
            setIsAuthenticated(false)

            setLoading(false)
            setUser(null);
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <nav>
            <main>
                <h1>TodoApp</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {
                        isAuthenticated ?
                            <li><button disabled={loading} className='btn' onClick={submitHandler}>Logout</button></li> :
                            <li><Link to="/login">Login</Link></li>

                    }
                </ul>
            </main>
        </nav>
    )
}

export default Header
