import {React,useContext,useEffect,useState} from 'react'
import styled from 'styled-components'
import { LoginContext } from '../Context/LoginContext'
const UserData=styled.div`
  background-color:rgba(114, 49, 235);
  width:100vw;
  height:100vh;
  justify-content:space-between;
  display:flex;
  flex-direction:"inline-block"
  
`
const UserImage=styled.img`
width:200px;
`
const UserInfo=styled.div`
background-color: rgba(255, 255, 255, .45);  
backdrop-filter: blur(5px);
box-shadow: inset 12px 15px 500px rgba(255, 255, 255, .7);
border-radius:10px;
z-index:0;
padding:20px;
height:50vh;
display:flex;
flex-direction:column;
justify-content:Space-around;
font-size:30px;
font-weight:500;
margin:auto;
`
const UserName=styled.div`
  font-size:20px;
  text-align:left;
  justify-content:center
`
const UserPassword=styled.input`
  width:300px;
  display:flex;
  flex-direction:column;
  font-size:20px;
  text-align:center;
  align-content:center;
  justify-content:center;
`
const Button=styled.button`
  width:250px;
  font-size:20px;
` 
const Title=styled.h1`
    font-size:25px;
    text-align:center;
`
const InfoCont=styled.div`
border-radius:10px;
padding:20px;
height:90vh;
display:flex;
flex-direction:column;
justify-content:Space-around;
font-size:30px;
margin:auto;
`
 const Profile = () => {
  const [disabled,setDisabled]=useState(true);
  const { loginData }=useContext(LoginContext)
  const [user,setUser]=useState("Not Logged in");
  const [email,setEmail]=useState("Login to check");
  useEffect(()=>{
    console.log(loginData);
    setUser(loginData.username);
    setEmail(loginData.email);
  },[loginData]);
  console.log(loginData.email);
  return (
    <UserData>
    
      
      <UserInfo className='bs-red'>
        <UserImage src={loginData.img}/>
        <UserName><b><i class='bx bx-user-circle' /></b> {user} </UserName>
        <UserName><b><i class='bx bx-envelope'/></b> {email} </UserName>
      </UserInfo>
      
      <InfoCont>
        <UserInfo>
          <UserName><b>Change Password</b></UserName>
          <UserPassword placeholder='New Password'/>
          <UserPassword placeholder='Confirm Password'/>
          <UserPassword placeholder='Current Password'/>
          <Button disabled={disabled}>Submit</Button>
        </UserInfo>
      </InfoCont>


    </UserData>
  )
}
export default Profile;