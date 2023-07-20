import {React,useContext,useState,useEffect} from 'react'
import styled from 'styled-components'
import { useHook } from '../../Hooks/useHook'
import { LoginContext } from '../../Context/LoginContext'
import Loading from '../../Components/Loading/Loading'
import AddProductModal from '../../Components/Modals/AddProductModal'
import ConfirmationModal from '../../Components/Modals/confirmationModal'
import axios from 'axios'
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
  position:relative
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
    width:500px;
    top: 20%;
    left: 35%;
    z-index:2;
    box-shadow: 7px 1px 41px -2px rgba(0,0,0,0.56);
`
const Button2=styled.a`
  text-decoration :none;
  ${'' /* background-color:black; */}
  height:10px;
  font-size:30px;
  color:${props=>props.color?props.color:"black"};
  &:hover{
    color:rgba(114, 49, 235,0.8)
}
`
const Wow=styled.div`
display:flex;
justify-content:right;
`




const Products = () => {
  const url = 'https://businessmanagementsolutionapi.onrender.com/api/products/';
  const [loading, setLoading] = useState(true);
  const { loginData } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [data, setData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  let acc;
  if (!loginData) {
    acc = JSON.parse(localStorage.getItem('suviadmin'));
  } else {
    acc = loginData;
  }

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const temp = useHook(url, acc.accessToken);

  useEffect(() => {
    if(data){
      setData(data);
    }else if (temp) {
      setData(temp);
      setLoading(false);
    }
  }, [data,temp]);

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };
  const handleShowModal1=()=>{
    setShowModal1(!showModal1);
  }
  const updateData=(ndata)=>{
    let nedata=data.concat(ndata);
    setData(nedata);
  }
  const handleDelete =async (index) => {
    console.log(index);
    const url=`https://businessmanagementsolutionapi.onrender.com/api/products/${index}`
    try{
      const headers={
        "token":`Bearer ${loginData.accessToken}`
    }
      const response=await axios.delete(url,{headers});
      console.log(response.data); 
      const updatedData = data.filter(item=>item._id!==index);
      console.log(updatedData)
      setData(updatedData);
      // Close the delete confirmation modal
      setShowModal(false);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Div>
          {
            showModal1?(<Modal><Wow><Button2 onClick={handleShowModal1}><i class='bx bx-x-circle'></i></Button2></Wow><AddProductModal onSuccess={()=>{setShowModal1(false)}} onUpdate={updateData}/></Modal> ):(<div></div>)
          }
          <Deev>
            <h2>All Products</h2>
            <Button1 onClick={handleShowModal1}><i class='bx bxs-file-plus'></i> Add New</Button1>
          </Deev>
          <Ul>
            {data.map((item) => (
              <Li key={item.id}>
              <Img src={item.img} alt="userImage"/>
                <Information width="150px">{item.title}</Information>
                <Information width="220px">₹{item.price}</Information> 
                <Information>{item.createdAt.substring(0,10)}</Information>
                <Information>
                  <Button href={`/product/${item._id}`} color="green"><i class='bx bx-window-open' ></i></Button>
                <Button
                  color="red"
                  onClick={() => handleDeleteConfirmation(item)}
                >
                  <i className="bx bxs-trash-alt"></i>
                </Button>
                </Information>
              </Li>
            ))}
          </Ul>
          {showModal && (
            <div>
              {/* Render delete confirmation modal */}
              <ConfirmationModal
                item={itemToDelete}
                onDelete={()=>handleDelete(itemToDelete._id)}
                onCancel={() => setShowModal(false)}
              />
            </div>
          )}
        </Div>
      )}
    </div>
  );
};

// const Products = () => {
//   const url="https://businessmanagementsolutionapi.onrender.com/api/products/";
//   const [loading,setLoading]=useState(true);
//   const {loginData} = useContext(LoginContext);
//   const [showModal,setShowModal]=useState(false);
//   const[data,setData]=useState();
//   let acc;
//   if(!loginData){
//       acc=JSON.parse(localStorage.getItem("suviadmin"));   
//   }else{
//       acc=loginData;
//   } 
//   const handleShowModal=()=>{
//     setShowModal(!showModal);
//   }
//   const temp=useHook(url,acc.accessToken);
//   useEffect(()=>{
//     if (temp) {
//       setData(temp)
//       setLoading(false);
//     }
//   },[temp])
//   const handleDelete=async(index)=>{
//     const updatedData = [...data];
//     updatedData.splice(index, 1);
//     setData(updatedData);
//   }
//   return (
//     <div>
//       {
//         loading?(<Loading/>)
//         :
//         (
//           <Div>
//             {
//               showModal?(<Modal><Wow><Button2 onClick={handleShowModal}><i class='bx bx-x-circle'></i></Button2></Wow><AddProductModal/></Modal> ):(<div></div>)
//             }
//             <Deev>
//               <h2>All Products</h2>
//               <Button1 onClick={handleShowModal}><i class='bx bxs-file-plus'></i> Add New</Button1>
//             </Deev>
//             <Ul>
//             {data.map((item)=>{
//               return <Li key={item.id}>
//                       <Img src={item.img} alt="userImage"/>
//                       <Information width="150px">{item.title}</Information> 
//                       <Information width="220px">₹{item.price}</Information> 
//                       <Information>{item.createdAt.substring(0,10)}</Information> 
//                       <Information>
//                         <Button href={`/users/${item._id}`} color="green"><i class='bx bx-window-open' ></i></Button>
//                         <Button color="red" value={item._id} onClick={()=>handleDelete(item._id)}><i class='bx bxs-trash-alt' ></i></Button>
//                       </Information>
//                     </Li>
//             })}
//             </Ul>
//           </Div>
//         )
//       }
//     </div>

//   )
// }

export default Products
