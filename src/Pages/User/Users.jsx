import {React,useContext,useState,useEffect} from 'react'
import{useParams} from "react-router-dom"
import styled from 'styled-components'
import { useHook } from '../../Hooks/useHook'
import { LoginContext } from '../../Context/LoginContext'
import Loading from '../../Components/Loading/Loading'
const Div=styled.div`
  margin-top:30px;
  flex:1;
  text-align:center;
  padding-top:30px;
`
const Li=styled.li`
display:flex;
  height:70px;
  ${'' /* width:700px; */}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  align-content:center;
  position:relative
`
const Img= styled.img`
  width: 50px;
  height:50px;
  border-radius:50%;
  margin:auto;
`
const Ul=styled.ul`
  list-style:none;
`
const Information=styled.div`
    Justify-content:center;
    width:${props=>props.width?props.width:""};
  margin:auto;
  display:flex;
`
const Button=styled.a`
  width:50px;
  height:50px;
  font-size:40px;
  margin:auto;
  color:${props=>props.color?props.color:"black"};
  &:hover{
    color:rgba(114, 49, 235,0.8)
}
`
export const Users = () => {
  const url="http://localhost:5001/api/users";
  const [loading,setLoading]=useState(true);
  const {loginData} = useContext(LoginContext);
  const[data,setData]=useState();
  let acc;
  if(!loginData){
      acc=JSON.parse(localStorage.getItem("suviadmin"));   
  }else{
      acc=loginData;
  } 

  const temp=useHook(url,acc.accessToken);
  useEffect(()=>{
    if (temp) {
      setData(temp)
      setLoading(false);
    }
  },[temp])

return (
  <div>
    {
      loading?(<Loading/>)
      :
      (
        <Div>
          <h2>All Users</h2>
          <Ul>
          {data.map((item)=>{
            return <Li key={item.id}><Img src={item.img} alt="userImage"/><Information width="150px">{item.username}</Information> <Information width="220px">{item.email}</Information> <Information>{item.createdAt.substring(0,10)}</Information> <Information><Button href={`/users/${item._id}`} color="green"><i class='bx bx-window-open' ></i></Button><Button href={`/users/${item._id}`} color="red"><i class='bx bxs-trash-alt' ></i></Button></Information></Li>
          })}
          </Ul>
        </Div>
      )
    }
  </div>
  
)
}






const UserData=styled.div`
padding-top:50px;
  width:100vw;
  justify-content:"space-around";
  display:flex;
  flex-direction:"inline-block"
`
const UserImage=styled.img`
flex:1;
width:100px;
margin:20px;
`
const UserInfo=styled.div`
padding:40px;
display:flex;
flex-direction:column;
flex:2;
justify-content:Space-around;
font-size:30px;
`
const UserName=styled.div`

`
const UserEmail=styled.div`

`
const UserPassword=styled.input`
  width
`
export const User = () => {
  const {id}=useParams();
  const [disabled,setDisabled]=useState(false);
  const [user,setUser]=useState({});
  const url=`http://localhost:5001/api/users/find/${id}`
  const {loginData}=useContext(LoginContext);
  const [loading,setLoading]=useState(true);
  const getuser=useHook(url,loginData.accessToken);
  console.log(getuser);
  useEffect(()=>{
    if (getuser) {
      setUser(getuser);
      setLoading(false);
    }
  },[getuser])
  if(loading){
    return (
      <Loading/>
    )
  }
  return (
    <UserData>
      <UserImage src={user.img}/>
      <UserInfo className='bs-red'>
        <UserName><b>Name :</b> {user.username}</UserName>
        <UserName><b>Email :</b> {user.email} </UserName>
      </UserInfo>
    </UserData>
  )
}


