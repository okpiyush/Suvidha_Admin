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


const AddEmailModal = ({onSuccess,onUpdate}) => {
    const {loginData}=useContext(LoginContext);
    const handleSubmit= async (e)=>{
        e.preventDefault(); //prevent the form form refreshign the page
        const { name, price, categories,img,size,desc} = e.target.elements;
        console.log(name.value+" "+price.value);
        const payload={
                "title":name.value,
                "desc" :desc.value,
                "categories":categories.value.split(" "),
                "size":size.value,
                "img":img.value,
                "price":price.value,
                "featured":true
        }
        console.log(payload,loginData.payload);
        const headers={
            "token":`Bearer ${loginData.accessToken}`
        }
        const url="http://localhost:5001/api/products/"
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
    return (
    <div>
    <h2>
        Send Global Email
    </h2>
        <Form onSubmit={handleSubmit}>
            <Input name="name" placeholder="Your Name"></Input>
            <Input name="designation" placeholder='Your Designation'></Input>
            <Input name="Subject" placeholder="Subject"></Input>
            <Textarea name="desc" placeholder="Email Body"></Textarea>
            <center><Button type="submit">Submit</Button></center>
        </Form>
    </div>
  )
}

export default AddEmailModal