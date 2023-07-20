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


const AddSlideModal = ({onSuccess,onUpdate}) => {
    const {loginData}=useContext(LoginContext);
    const handleSubmit= async (e)=>{
        e.preventDefault(); //prevent the form form refreshign the page
        const { title, img,color,desc,link} = e.target.elements;
        const payload={
            img:img.value,
            title:title.value,
            color:color.value,
            desc:desc.value,
            link:link.value,
        }
        console.log(payload);
        const headers={
            "token":`Bearer ${loginData.accessToken}`
        }
        const url="https://businessmanagementsolutionapi.onrender.com/api/slideshow/"
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
        Add Slide
    </h2>
        <Form onSubmit={handleSubmit}>
            <Input name="title" placeholder="Title" required></Input>
            <Input name="img" placeholder="Image Link" required></Input>
            <Input name="link" placeholder="link" required></Input>
            <Input type="color" name="color"  required></Input>
            <Textarea name="desc" placeholder="Description" required></Textarea>
            <center><Button type="submit">Submit</Button></center>
        </Form>
    </div>
  )
}

export default AddSlideModal