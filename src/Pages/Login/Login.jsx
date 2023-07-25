import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from 'react'
import { LoginContext } from '../../Context/LoginContext'
import { useNavigate } from 'react-router-dom'
import  axios  from 'axios'
import { useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import Flag from '../../Components/Modals/Flag'
const Container = styled.div`
    background-color:rgba(114, 49, 235);
    background-size: cover;
    height:100vh;
    display:flex;
    align-items:center;justify-content:center;
    overflow-y:hidden;
`
const Wrapper = styled.div`
    background-color:rgba(256,256,256,0.9);
    padding:10px;
    height:inherit;
    width:600px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    ${'' /* box-shadow:0px 0px 5px 2px rgba(256,256,256,0.9); */}
    margin-left:auto;
`
const Title = styled.h1`
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
const Agreement=styled.span`
    width:auto;
    margin:10px;
`
const Button = styled.button`
    font-size:18px;
    width:150px;
    height:40px;
    padding:5px;
    background-color:white;
    border:2px solid grey;
    border-radius:20px;
    margin:10px;
    cursor:pointer;
    background-color:rgba(114, 49, 235,0.5);
    &:hover{
        background-color:rgba(114, 49, 235,0.8)
    }
`
const Link=styled.a`

color:blue;
text-decoration:none;
cursor:pointer;
`
const Login = () => {
    const { handleLogin,loginData } = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading]=useState(false);
    const[flag,setFlag]=useState(false);
    const [flagData,setFlagData]=useState("");
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
  useEffect(()=>{
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 3000);
      return () => clearTimeout(timer);
    }

  },[flag]);
  const setter=(text)=>{
    setFlagData(text); 
    setFlag(true);     
  }
  
  const apiUrl = 'https://api.my-ip.io/ip.json';
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      return(response.data.ip);
    } catch (error) {
      console.error('Failed to fetch data from the API:');
    }
  };
    const handleSubmit = async (e) => {
      
      e.preventDefault();
      if(username===""||password===""){
        setter("Please enter Username and Password");
        return;
      }
      const userData = {
        "username" :username,
        "password" :password
      };
      
      let userIp=await fetchData() ;
      console.log(userIp)
      const headers={
        ip:userIp
      }
      console.log(headers);
      try{
        setLoading(true);
        const response = await axios.post(`https://businessmanagementsolutionapi.onrender.com/api/auth/login`, userData,{headers});
        // Handle the response as needed
        if(response.data.isAdmin){
          handleLogin(response.data);
        }else{
              
          return;
        }
        
        navigate("/home", { replace: true });
        checkUser();
      }catch(err){
        alert("Enter Correct Username or Password")  
        setLoading(false)
        console.log(err);
      }
    };
    useEffect(()=>{
      setter(`ID: admin \n Password: admin`);
    },[]);
  return (
    <div>
    {
      loading&& <Loading/>
    }
      {
      !loading&&
      <Container>
        
        <Wrapper>
          {flag&& <Flag text={flagData}/>}
            <Title>
                Sign in
            </Title>
            <Form>
                <Input onChange={handleUserChange} placeholder="Username"/>
                <Input type="password"onChange={handlePasswordChange}placeholder="Password"/>
                <Button onClick={handleSubmit} >Sign in</Button>
                <Agreement>Forgot your Password? <Link href="/forgotpassword"> Forgot Password </Link></Agreement>
                <Agreement>Don't have an account ? <Link href="/register">Create account</Link></Agreement>
            </Form>
            
        </Wrapper>
        
      </Container>
    }
    
    </div>
  )
}

export default Login