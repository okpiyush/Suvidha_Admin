import React, { useContext, useState } from 'react'
import {useHook} from "../../Hooks/useHook"
import { LoginContext } from '../../Context/LoginContext';
import styled from 'styled-components';
const Div=styled.div`
  flex:1;
  height:440px;
  text-align:center;
  padding-top:30px;
`
const Li=styled.li`
display:flex;
  height:70px;
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
    color:${props=>props.color?props.color:"black"};
    font-weight:500;
  margin:auto;
  display:flex;
`
const Button=styled.div`
  width:50px;
  height:50px;
  font-size:40px;
  margin:auto;
  color:${props=>props.color?props.color:"black"};
  &:hover{
    color:rgba(114, 49, 235,0.8)
}
`
const NewOrder = () => {
    const url="http://localhost:5001/api/order?new=true";
    
    const {loginData} = useContext(LoginContext);

    let acc;
    if(!loginData){
        acc=JSON.parse(localStorage.getItem("suviadmin")).accessToken;   
    }else{
        acc=loginData.accessToken;
    } 

    const temp=useHook(url,acc);
    const data=!temp?[]:temp;
;
  return (
    <Div>
      <h2>New Orders</h2>
      <Ul>
      {data.map((item)=>{
        return (
            <Li key={item.id}>
                <Information>{item._id}</Information>
                <Information>{item.amount}</Information>
                <Information color={item.status==="Pending"?"red":"green"}>{item.status}</Information>
                <Information>
                    <Button color="red" > <i class='bx bxs-x-circle'></i></Button>
                    <Button color="green"><i class='bx bxs-chevrons-right' ></i></Button>
                </Information>

            </Li>
        )
      })}
      </Ul>
    </Div>
    
  )
}

export default NewOrder