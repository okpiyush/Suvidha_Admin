import {React,useContext,useState,useEffect} from 'react'
import styled from 'styled-components'
import { useHook } from '../../Hooks/useHook'
import { LoginContext } from '../../Context/LoginContext'
import Loading from '../../Components/Loading/Loading'
import AddEmailModal from '../../Components/Modals/AddEmailModal'
import ConfirmationModal from '../../Components/Modals/confirmationModal'
import SuccessModel from "../../Components/Modals/SuccessModel"
import SendSingleEmail from "../../Components/Modals/SendSingleEmail"
import axios from 'axios'
const Div=styled.div`
  margin-top:30px;
  flex:1;
  text-align:center;
  padding-top:30px;
`
const Li=styled.li`
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




const Mails = () => {
  const url = 'http://localhost:5001/api/mail/getmails/';
  const [loading, setLoading] = useState(true);
  const { loginData } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [leSuccess, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [mail,setMail]=useState(undefined)
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




  // handle show single modal for handing the specific email modal;
  const handleShowSingleModal=async (e)=>{
    const getMail=e.target.getAttribute("value");
    if(getMail!=null)setMail(getMail);
    setShowSingleModal(!showSingleModal);

  }





  //for updating the data when a new email is added from the admin panel
  const updateData=()=>{
    setSuccess(true);
    setTimeout(()=>{
      setSuccess(false);
    },1800);

  }


  //for deletion of a  mail 
  const handleDelete =async (index) => {
    console.log(index);
    const url=`http://localhost:5001/api/mail/delete/${index}`
    try{
      const response=await axios.delete(url);
      console.log(response.data); 
      const updatedData = data.filter(item=>item._id!==index);
      console.log(updatedData)
      setData(updatedData);
      // Close the delete confirmation modal
      setShowModal(false);
      updateData();
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
            showModal1&&(
              <Modal>
                <Wow>
                <Button2 onClick={handleShowModal1}><i class='bx bx-x-circle'></i></Button2>
                </Wow>
                <AddEmailModal onSuccess={()=>{setShowModal1(false)}} onUpdate={updateData}/>
              </Modal> 
            )
          }
          {
            showSingleModal&&(
              <Modal>
                <Wow>
                <Button2 onClick={handleShowSingleModal}><i class='bx bx-x-circle'></i></Button2>
                </Wow>
                <SendSingleEmail onSuccess={()=>{setShowSingleModal(false)}} onUpdate={updateData} email={mail}/>
              </Modal> )
          }
          <Deev>
            <h2>All Mails</h2>
            <Button1 onClick={handleShowModal1}><i class='bx bxs-file-plus'></i> Send Email</Button1>
          </Deev>
          {leSuccess&&<SuccessModel/>}
          <Ul>
            {data.map((item) => (
              <Li key={item.id}>
                <Information width="150px">{item._id}</Information>
                <Information width="150px">{item.mail}</Information> 
                <Information>{item.createdAt.substring(0,10)}</Information>
                <Information>
                  <Button onClick={handleShowSingleModal} color="green"><i class='bx bx-mail-send' value={item.mail}></i></Button>
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
export default Mails
