import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import { DataContext, ourServer } from "./index"
import axios from "axios"
import Home from "./components/Home"

const App = () => {

  const { setUser, setIsAuthenticated } = useContext(DataContext)

  useEffect(()=>{
    axios.get(`${ourServer}/users/me`,{
      withCredentials: true
    }).then(res=>{
      setIsAuthenticated(true);
      setUser(res.data.user);
    }).catch(err=>{
      setIsAuthenticated(false);
      setUser(null);
    })
  }, [])

  return (
    <>
  <Router>
    <Header />
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
    </>
  )
}

export default App
