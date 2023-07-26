import {React,useContext,useState,useEffect} from 'react'
import styled from 'styled-components'
import { useHook } from '../../Hooks/useHook'
import { LoginContext } from '../../Context/LoginContext'
import Loading from '../../Components/Loading/Loading'
import AddProductModal from '../../Components/Modals/AddProductModal'
import ConfirmationModal from '../../Components/Modals/confirmationModal'
import axios from 'axios'
import LogModal from '../../Components/Modals/LogModal'
import Log from './Log'
const Div=styled.div`
  margin-top:30px;
  flex:1;
  text-align:center;
  padding-top:30px;
`
const Li=styled.li`
  border-radius:3px 0px 0px 3px;
  border-left:3px solid rgb(107, 60, 192) ;
  margin:5px;
  display:flex;
  height:70px;
  ${'' /* width:700px; */}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  align-content:center;
  justify-content:space-between;
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
  margin:auto;
  display:flex;
`
const Button=styled.a`
  width:50px;
  height:50px;
  font-size:40px;
  margin:auto;
  color:${props=>props.color?props.color:"black"};
  &:hover{
    color:rgba(114, 49, 235,0.8)
}
`
const Deev=styled.div`
  width:96vw;
  display:flex;
  font-size:40px;
  color:${props=>props.color?props.color:"black"};
  margin:auto;
  flex-direction:row;
  justify-content:space-around;
`
const Button1=styled.a`
  width:200px;
  text-decoration :none;
  ${'' /* background-color:black; */}
  height:50px;
  font-size:20px;
  color:${props=>props.color?props.color:"black"};
  &:hover{
    color:rgba(114, 49, 235,0.8)
}
`
const Modal=styled.div`
    position: fixed;
    background-color:#e8e8e8;
    height:450px;
    width:400px;
    top: 20%;
    left: 35%;
    z-index:2;
    box-shadow: 7px 1px 41px -2px rgba(0,0,0,0.56);
`
const Button2=styled.a`
  text-decoration :none;
  ${'' /* background-color:black; */}
  width:120px;
  font-size:30px;
    align-content:center;
  color:${props=>props.color?props.color:"black"};
  &:hover{
    color:rgba(114, 49, 235,0.8)
}
`
const Wow=styled.div`
display:flex;
justify-content:right;
`



// 
const Logs= () => {
  const url = 'https://businessmanagementsolutionapi.onrender.com/api/auth/getallip';
  const [loading, setLoading] = useState(true);
  const { loginData } = useContext(LoginContext);
  const [showModalData, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [data, setData] = useState(null);
  const handleShowModal1=(ip)=>{
    console.log(ip);
    setShowModal1(!showModal1);
    setShowModal(ip);
  }
  useEffect(()=>{
    const getset = async ()=>{
        try{
            const headers= {
                "token":`Bearer ${loginData.accessToken}`
            }
            const reso=await axios.get(url,{headers});
            setData(reso.data);
            setLoading(false);
        }catch(Err){
            console.log("error occired")
        }
    }
    getset();
  },[loginData]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Div>
          {
            showModal1?(<Modal><Wow><Button2 onClick={handleShowModal1}><i class='bx bx-x-circle'></i></Button2></Wow><LogModal ip={showModalData}/></Modal> ):(<div></div>)
          }
          <Deev>
            <h2>All Admin Login</h2>
          </Deev>
          <Ul>
            {data.map((item) => (
                <Li>
                    <Information width="200px">{item.Logs}</Information>
                    <Information width="150px">{item.createdAt.substring(0,10)}</Information>
                    <Information width="150px">{item.createdAt.substring(11,19)}</Information>
                    <Button2 onClick={()=>handleShowModal1(item.Logs)}><i class='bx bxs-info-square' ></i></Button2>
                </Li>
            ))}
          </Ul>
        </Div>
      )}
    </div>
  );
};


export default Logs
