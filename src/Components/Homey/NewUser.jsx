import React, { useContext, useState } from 'react'
import {useHook} from "../../Hooks/useHook"
import { LoginContext } from '../../Context/LoginContext';
import styled from 'styled-components';
const Div=styled.div`
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
const NewUser = () => {
    const url="http://localhost:5001/api/users?new=true";
    
    const {loginData} = useContext(LoginContext);
 
    let acc;
    if(!loginData){
        acc=JSON.parse(localStorage.getItem("suviadmin"));   
    }else{
        acc=loginData;
    } 

    const temp=useHook(url,acc.accessToken);
    const data=!temp?[]:temp;

  return (
    <Div>
      <h2>New Users</h2>
      <Ul>
      {data.map((item)=>{
        return <Li key={item.id}><Img src={item.img} alt="userImage"/><Information width="150px">{item.username}</Information> <Information width="220px">{item.email}</Information> <Information>{item.createdAt.substring(0,10)}</Information> <Information><Button href={`/users/${item._id}`} color="green"><i class='bx bx-window-open' ></i></Button></Information></Li>
      })}
      </Ul>
    </Div>
    
  )
}

export default NewUser