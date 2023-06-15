import React from 'react'
import Homey from '../../Components/Homey/Homey'
import Welcome from '../../Components/Welcome'
const Home = () => {
  return (
    <div>
      {
        localStorage.getItem("suviadmin")?(<Homey login={JSON.parse(localStorage.getItem("suviadmin"))}/>):(<Welcome/>)
      }
    </div>
  )
}

export default Home