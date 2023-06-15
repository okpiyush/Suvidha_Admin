import React, { useContext } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';
import { usePost } from '../../Hooks/usePost';

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


const SendSingleEmail = ({email,onSuccess,onUpdate}) => {
    const {loginData}=useContext(LoginContext);
    const handleSubmit= async (e)=>{
        e.preventDefault(); //prevent the form form refreshign the page
        const { destination, name,designation,subject,desc} = e.target.elements;
        //this is just to give it a final check if the  values are at the correct space or not
        if(destination.value===""|| name.value===""||designation.value===""||subject.value===""||desc.value===""||subject.value.length<=5||desc.value.length<=50){
            alert("Fill the required fields first");
            return;
        }
        const payload={
                email:destination.value,
                name:name.value,
                desig : designation.value,
                subject: subject.value,
                body:desc.value       
        }

        const headers={
            "token":`Bearer ${loginData.accessToken}`
        }

        const url="http://localhost:5001/api/mail/sendmail"
        try{
            const response=await axios.post(url,payload,{headers});
            console.log(response);
           try{
            onUpdate();
           }catch(err){
            console.log(err);
           }
            onSuccess();
        }catch(err){
            console.log("Error")
        }
        
    }
    return (
    <div>
    <h2>
        Send Email
    </h2>
        <Form onSubmit={handleSubmit}>
            <Input name="destination" value={email} disabled></Input>
            <Input name="name" value={loginData.username.toUpperCase()} disabled></Input>
            <Input name="designation"  placeholder="Your Designation" required></Input>
            <Input name="subject" placeholder="Subject (min length is 5)" required></Input>
            <Textarea name="desc" placeholder="Email Body (min length is 50)" required></Textarea>
            <center><Button type="submit">Submit</Button></center>
        </Form>
    </div>
  )
}

export default SendSingleEmail