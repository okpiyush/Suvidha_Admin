import React, { useContext } from 'react'
import Homey from '../../Components/Homey/Homey'
import Welcome from '../../Components/Welcome'
import { useState } from 'react'
import { LoginContext } from '../../Context/LoginContext'
const Home = () => {
  const {loginData} =useContext(LoginContext);
  useState(()=>{
    console.log("home");
  },[loginData])
  return (
    <div>
      {
        localStorage.getItem("suviadmin")?(<Homey/>):(<Welcome/>)
      }
    </div>
  )
}

export default Home