import {React,useContext,useState,useEffect} from 'react'
import{useParams} from "react-router-dom"
import styled from 'styled-components'
import { useHook } from '../../Hooks/useHook'
import { LoginContext } from '../../Context/LoginContext'
import Loading from '../../Components/Loading/Loading'
const ItemData=styled.div`
padding-top:50px;
  width:100vw;
  justify-content:"space-around";
  display:flex;
  flex-direction:row;
`
const ItemImage=styled.img`
    width:400px;
    height:400px;
`
const ItemIm=styled.div`
    ifont-size:18px;
`
const ItemInfo=styled.div`
padding:40px;
display:flex;
flex-direction:column;
flex:2;
justify-content:Space-around;
font-size:30px;
`
const ItemName=styled.div`

`
const Button = styled.a`
text-decoration:none;
    font-size:18px;
    width:150px;
    height:40px;
    padding:5px;
    background-color:white;
    border:2px solid grey;
    border-radius:20px;
    margin:10px;
    cursor:pointer;
    color:white;
    text-align:center;
    background-color:rgba(114, 49, 235,0.5);
    &:hover{
        background-color:rgba(114, 49, 235,0.8)
    }
`
const Product = () => {
  const {id}=useParams();
  const [disabled,setDisabled]=useState(false);
  const [Item,setItem]=useState({});
  const url=`http://localhost:5001/api/products/find/${id}`
  const {loginData}=useContext(LoginContext);
  const [loading,setLoading]=useState(true);
  const getItem=useHook(url,loginData.accessToken);
  console.log(getItem);
  useEffect(()=>{
    if (getItem) {
      setItem(getItem);
      setLoading(false);
    }
  },[getItem])
  if(loading){
    return (
      <Loading/>
    )
  }
  return (
    <ItemData>
        <ItemImage src={Item.img}/>
      <ItemInfo className='bs-red'>
        <ItemName><b>Name :</b> {Item.title}</ItemName>
        <ItemName><b>Categories :</b> {Item.categories.map((item)=>{return`${item}, ` })} </ItemName>
        <ItemName><b>Size :</b> {Item.size} </ItemName>
        <ItemName><b>Description :</b> {Item.desc} </ItemName>
        <ItemName><b>Cheapest Price :</b> {Item.price} </ItemName>
        <ItemName><b>Listed on :</b> {Item.createdAt.substring(0,10)} </ItemName>
        <ItemName><b>Updated on :</b> {Item.updatedAt.substring(0,10)} </ItemName>
      </ItemInfo>
    </ItemData>
  )
}
export default Product