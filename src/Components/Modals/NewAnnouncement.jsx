import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';

const Form=styled.form`
    display:flex;
    flex-direction:column; 
    justify-content:space-around;
    align:center;
    padding:10px;
    height:120px;
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
const Div=styled.li`
    width:400px;
    
    word-wrap:break-word;
`

const NewAnnouncement= ({onSuccess,onUpdate}) => {
    const [AddArray,setAddArray]=useState([]);
    const [Line,setLine]=useState();
    const {loginData}=useContext(LoginContext);



    const handleSubmit= async (e)=>{
        e.preventDefault(); //prevent the form form refreshign the page
        if(AddArray.length===0){
            alert("Add announcements");
            return;
        }
        const {featured} = e.target.elements;
        const payload={
               announcement:AddArray,
               featured :featured.value==='false'?false:true
        }
        setAddArray([]);
        e.target.reset();
        console.log(payload);
        const headers={
            "token":`Bearer ${loginData.accessToken}`
        }
        const url="https://businessmanagementsolutionapi.onrender.com/api/announcement/"
        try{
            const response=await axios.post(url,payload,{headers});
            console.log(response);
           try{
            onUpdate(response.data);
           }catch(err){
            console.log(err);
           }
            onSuccess();
        }catch(err){
            console.log("Error")
        }
    }
    const updateArray=()=>{
        if(Line===""){alert("write an announcement"); return};
        const arr=AddArray;
        arr.push(Line);
        setAddArray(arr);
        setLine("");
        return;
    }
    const updateLine=(e)=>{
        setLine(e.target.value);
    }
    const focusout=(e)=>{
        e.target.value=""
        setLine("");
    }
    return (
    <div>
    <h2>
        Add Announcement
    </h2>
        <Input id="announcement" placeholder="Title" onFocus={focusout} onChange={updateLine}></Input> <button onClick={updateArray}>Add</button>
        {AddArray.length!==0 &&(
            <ul>
                {AddArray.map((item)=>{
                    return <Div>{item}</Div>
                })}
            </ul>
        )}
        <Form onSubmit={handleSubmit}>
            <select name="featured">
                <option value={true} default>True</option>
                <option value={false} >False</option>
            </select>
            <center><Button type="submit">Submit</Button></center>
        </Form>
    </div>
  )
}

export default NewAnnouncement