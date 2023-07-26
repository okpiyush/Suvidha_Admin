import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';
import { useState } from 'react';

const Form=styled.form`
    display:flex;
    flex-direction:column; 
    justify-content:space-around;
    align:center;
    padding:10px;
    height:380px;
`
const Input=styled.input`
    width:360px;
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


const LogModal = ({ip}) => {
    const [data,setData]=useState();
    useEffect(()=>{
        const callAPI= async (ip)=>{
            const options = {
                method: 'GET',
                url: 'https://ip-reputation-geoip-and-detect-vpn.p.rapidapi.com/',
                params: {
                  ip: `${ip}`
                },
                headers: {
                  'X-RapidAPI-Key': '5429e89d1dmsh7d4bf3a4d13fbc9p19d657jsncde43959ed20',
                  'X-RapidAPI-Host': 'ip-reputation-geoip-and-detect-vpn.p.rapidapi.com'
                }
              };
              
              try {
                  const response = await axios.request(options);
                  setData(response.data);
              } catch (error) {
                  console.error(error);
              }
        }
        callAPI(ip);
    },[ip])

    return (
    <div>
    <h3>
        Login Details
    </h3>
    
    {
        data?
        <Form>
            <Input name="destination" value={ip} disabled></Input>
            <Input name="destination" value={data.city} disabled></Input>
            <Input name="destination" value={data.country} disabled></Input>
            <Input name="destination" value={data.organization} disabled></Input>
            <Input name="destination" value={data.postal_code} disabled></Input>
        </Form>
        :
        <div>
            Data not loaded
        </div>
    }

    </div>
  )
}

export default LogModal