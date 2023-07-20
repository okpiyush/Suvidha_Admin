import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from 'react'
import { LoginContext } from '../Context/LoginContext'
import { useNavigate } from 'react-router-dom'
import  axios  from 'axios'
import { useEffect } from 'react'
import wow from "./Logo.png"
const Container = styled.div`
    background-color:rgba(114, 49, 235);
    background-size: cover;
    height:100vh;
    display:flex;
    align-items:center;justify-content:center;
    overflow-y:hidden;
`
const Wrapper = styled.div`
    ${'' /* background-color:rgba(256,256,256,0.6); */}
    padding:5px;
    border-radius:2vw;
    height:500px;
    width:20vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    ${'' /* box-shadow:0px 0px 5px 2px rgba(0,0,0,0.3); */}
    margin-left:60vw;
`
const Wrapper1 = styled.div`
    background-color:rgba(256,256,256,0.5);
    border-radius:10vw;
    padding:5px;
    height:inherit;
    width:60vw;
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    justify-content:center;
    margin-left:auto;
    position:absolute;
    left:-7vw;
`
const Wrapper3 = styled.div`
    background-color:rgba(256,256,256,0.1);
    border-radius:10vw;
    
    padding:5px;
    height:inherit;
    width:60vw;
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    justify-content:center;
    margin-left:auto;
    position:absolute;
    left:-8vw;
`
const Title = styled.h1`
color:white;
`
const Form = styled.form`

    display:flex;
    flex-direction:column;
    align-items:center;
    justify:content:center;
`
const Input = styled.input`
    width:300px;
    height:40px;
    border:none;
    padding:5px;
    margin-top:10px;
    font-size:25px;
`
const IMG= styled.img`
  width:220px;
  margin-right:10px;  
`
const Agreement=styled.span`
    width:auto;
    margin:10px;
`
const Button = styled.a`
    text-decoration:none;
    text-align:center;
    font-size:18px;
    color:white;
    width:150px;
    height:40px;
    padding:5px;
    background-color:white;
    border:2px solid rgba(256, 256, 256,0.1);
    border-radius:10px;
    margin:10px;
    cursor:pointer;
    background-color:rgba(256, 256, 256,0.1);
    &:hover{
        background-color:rgba(256,256,256,0.4);
        color:White;
    }
`
const Link=styled.a`

color:blue;
text-decoration:none;
cursor:pointer;
`
const Welcome = () => {
    const { handleLogin,loginData } = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleUserChange=(e)=>{
    setUsername(e.target.value);
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value);
  }
  const checkUser=()=>{
    if(loginData){
      navigate("/home",{replace:true});
    }
  }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(username===""||password===""){
        alert("Please enter Username and Password");
        return;
      }
      const userData = {
        "username" :username,
        "password" :password
      };

      try{
        const response = await axios.post(`https://businessmanagementsolutionapi.onrender.com/api/auth/login`, userData);
        // Handle the response as needed
        if(response.status===401){
          alert("Invalid Username or Password");
        }
            console.log(response.data);
    
        if(response.data.isAdmin){
          handleLogin(response.data);
        }else{
          alert("You are not authorized");
          return;
        }
        navigate("/home", { replace: true });
        checkUser();
      }catch(err){
        console.log(err);
      }
    };

  
  return (
    <div>
      <Container>
      <Wrapper1>
        <Wrapper3>
          <Wrapper3>
            <Wrapper3>
              <Wrapper3></Wrapper3>
            </Wrapper3>
          </Wrapper3>
          
        </Wrapper3>
        
        <IMG src={wow}/>    
      </Wrapper1>
        <Wrapper>
            <Title>
                Suvidha Admin
            </Title>
            <Button href="/login">Login</Button>
            <Button>Register</Button>
        </Wrapper>
        
    </Container>
    </div>
  )
}

export default Welcome