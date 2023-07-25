import React, { useContext } from 'react'
import { DataContext } from '../index'

const Profile = () => {
  const {user} = useContext(DataContext);
  return (
    <div>
      <h1>{user ?user.name:"You are not sign up or log in"}</h1>
      <p>{user ?user.email:"Login first"}</p>
    </div>
  )
}

export default Profile
