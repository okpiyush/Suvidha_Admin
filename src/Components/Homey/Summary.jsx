import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { LoginContext} from '../../Context/LoginContext'
import { useHook } from '../../Hooks/useHook'
import Loading from '../Loading/Loading'
const Wrapper=styled.div`
    width:100vw;
`
const Info=styled.div`
display:flex;
width:100vw;
font-size:20px;
justify-content:space-around;
padding:20px;
`
const InfoData=styled.div`
`
const InfoPanel=styled.div`
`
const InfoHolder = styled.div`
    display:flex;
    background-color:white;
    flex-direction:column;
    width:150px;
    height:150px;
    border : 4px solid rgba(114, 49, 235,0.4);
    box-shadow:0px 0px 10px 2px rgba(0,0,0,0.5); 
    border-radius:10%;
    text-align:center;
    justify-content:center;
    font-weight:600;
    color:black;
`
const Title= styled.h3`
    padding-left:5vw;

`
const Summary = (props) => {
    const {loginData}= useContext(LoginContext);
    const [users,setusers]=useState();
    const [products,setProducts]=useState();
    const [orders,setOrders]=useState();
    const [loading,setLaoding]=useState(true);

    const user=useHook("https://businessmanagementsolutionapi.onrender.com/api/users",loginData.accessToken);
    const product=useHook("https://businessmanagementsolutionapi.onrender.com/api/products/",loginData.accessToken);
    const order=useHook("https://businessmanagementsolutionapi.onrender.com/api/order/",loginData.accessToken);

    useEffect(()=>{
        console.log(products);
        if(user!==undefined &&product!==undefined && order!==undefined)
        {
            setusers(user.length);
            setProducts(product.length);
            setOrders(order.length);
            setLaoding(false);
        }
    },[user,product,order])
    if(loading){
        return <Wrapper><Loading/></Wrapper>
    }
    return (
    <Wrapper>
        <Title>
            Welcome {loginData.username},
        </Title>
        <Info>
            <InfoHolder>
                <InfoData>{users}</InfoData> 
                <InfoPanel>Users</InfoPanel>
            </InfoHolder>
            <InfoHolder>
                <InfoData>{products}</InfoData> 
                <InfoPanel>Products</InfoPanel>
            </InfoHolder>
            <InfoHolder>
                <InfoData>{orders}</InfoData> 
                <InfoPanel>Orders</InfoPanel>
            </InfoHolder>
        </Info>
    </Wrapper>
  )
}

export default Summary