import React, { useContext } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';

const Form=styled.form`
    display:flex;
    flex-direction:column; 
    justify-content:space-around;
    align:center;
    padding:10px;
    height:380px;
`
const Input=styled.input`
    width:450px;
    height:30px;
    border-radius:15px;
    border:2px solid lightgrey;    
    text-align:center;
    align-self:center;
`
const Button=styled.button`
    font-size:18px;
    width:150px;
    height:40px;
    padding:5px;
    background-color:white;
    border:2px solid grey;
    border-radius:20px;
    cursor:pointer;
    background-color:rgba(114, 49, 235,0.5);
    &:hover{
        background-color:rgba(114, 49, 235,0.8)
    }
`
const Textarea=styled.textarea`
    width:450px;
    height:100px;
    border:2px solid lightgrey; 
    border-radius:15px;
    text-align:center;
    align-self:center;
`


const SeeAnnouncements = ({id,announcements,featured}) => {
    const {loginData}=useContext(LoginContext);
    return (
    <div>
    <h2>
        Announcement Details
    </h2>
        <Form>
            <Input name="destination" value={id} disabled></Input>
            {
                announcements.map((item)=>{
                    return <Input name="name" value= {item} disabled></Input>
                })
            }
            <Input name="name" value= {featured} disabled></Input>
        </Form>
    </div>
  )
}

export default SeeAnnouncements