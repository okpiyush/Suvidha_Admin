import axios from "axios";

import {useState,useEffect} from 'react';


//use of accesstoken is to verify admin
export const usePost=(url,accessToken,payload)=>{
    const [data,setData]=useState();
    useEffect(()=>{
        const headers={
            "token":`Bearer ${accessToken}`
        }
        const makeRequest=async()=>{
            try{
                const getData= await axios.post(url,payload,{headers});
                setData(getData.data);
            }catch(err){
                console.log("Error");
                return (err);
            }
        }
        makeRequest();
    },[url,payload,accessToken]);
    return data;
}