import { React, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useHook } from "../../Hooks/useHook";
import { LoginContext } from "../../Context/LoginContext";
import Loading from "../../Components/Loading/Loading";
import ConfirmationModal from "../../Components/Modals/confirmationModal";
import SuccessModel from "../../Components/Modals/SuccessModel";
import axios from "axios";
import SeeAnnouncements from "../../Components/Modals/SeeAnnouncements";
import NewAnnouncement from "../../Components/Modals/NewAnnouncement";
import AddSlideModal from "../../Components/Modals/AddSlideMoal";
const Div = styled.div`
  margin-top: 30px;
  flex: 1;
  text-align: center;
  padding-top: 30px;
`;
const Li = styled.li`
  background-color: ${(props) => (props.color ? props.color : "white")};
  border-left: 3px solid rgb(107, 60, 192);
  margin-bottom: 5px;
  display: flex;
  height: 70px;
  ${"" /* width:700px; */}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  align-content: center;
  position: relative;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: auto;
`;
const Ul = styled.ul`
  list-style: none;
`;
const Information = styled.div`
  justify-content: center;
  width: ${(props) => (props.width ? props.width : "")};
  margin: auto;
  display: flex;
`;
const Button = styled.a`
  width: 50px;
  height: 50px;
  font-size: 40px;
  margin: auto;
  color: ${(props) => (props.color ? props.color : "black")};
  &:hover {
    color: rgba(114, 49, 235, 0.8);
  }
`;
const Deev = styled.div`
  width: 96vw;
  display: flex;
  font-size: 40px;
  color: ${(props) => (props.color ? props.color : "black")};
  margin: auto;
  flex-direction: row;
  justify-content: space-around;
`;
const Button1 = styled.a`
  width: 220px;
  font-size: 25px;
  text-decoration: none;
  ${"" /* background-color:black; */}
  height:50px;
  font-size: 20px;
  color: ${(props) => (props.color ? props.color : "black")};
  &:hover {
    color: rgba(114, 49, 235, 0.8);
  }
`;
const Modal = styled.div`
  position: fixed;
  background-color: #e8e8e8;
  height: 450px;
  width: 500px;
  top: 20%;
  left: 35%;
  z-index: 2;
  box-shadow: 7px 1px 41px -2px rgba(0, 0, 0, 0.56);
`;
const Button2 = styled.a`
  text-decoration: none;
  ${"" /* background-color:black; */}
  height:10px;
  font-size: 30px;
  color: ${(props) => (props.color ? props.color : "black")};
  &:hover {
    color: rgba(114, 49, 235, 0.8);
  }
`;
const Wow = styled.div`
  display: flex;
  justify-content: right;
`;

const Slideshow = () => {
  const url =
    "https://businessmanagementsolutionapi.onrender.com/api/slideshow/";
  const [loading, setLoading] = useState(true);
  const { loginData } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [leSuccess, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  let acc;
  if (!loginData) {
    acc = JSON.parse(localStorage.getItem("suviadmin"));
  } else {
    acc = loginData;
  }

  const temp = useHook(url, acc.accessToken);

  useEffect(() => {
    if (data) {
      setData(data);
      console.log(data);
    } else if (temp) {
      setData(temp);
      setLoading(false);
    }
  }, [data, temp]);

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleShowModal1 = () => {
    setShowModal1(!showModal1);
  };

  // handle show single modal for handing the specific email modal;
  const handleShowSingleModal = async (e) => {
    if (e.target.id.length !== 0) {
      const data = {
        id: e.target.getAttribute("id"),
        announcement: e.target.getAttribute("announcements").split(","),
        featured: e.target.getAttribute("featured"),
      };
      setAnnouncement(data);
    }

    setShowSingleModal(!showSingleModal);
  };

  //for updating the data when a new email is added from the admin panel
  const updateData = (ndata) => {
    setSuccess(true);
    let nedata = data.concat(ndata);
    setData(nedata);
    setTimeout(() => {
      setSuccess(false);
    }, 1800);
  };

  //for deletion of a slide
  const handleDelete = async (index) => {
    console.log(index);
    const url = `https://businessmanagementsolutionapi.onrender.com/api/slideshow/delete/${index}`;
    try {
      const headers = {
        token: `Bearer ${loginData.accessToken}`,
      };
      const response = await axios.delete(url, { headers });
      console.log(response.data);
      const updatedData = data.filter((item) => item._id !== index);
      console.log(updatedData);
      setData(updatedData);
      // Close the delete confirmation modal
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Div>
          {showModal1 && (
            <Modal>
              <Wow>
                <Button2 onClick={handleShowModal1}>
                  <i class="bx bx-x-circle"></i>
                </Button2>
              </Wow>
              <AddSlideModal
                onSuccess={() => {
                  setShowModal1(false);
                }}
                onUpdate={updateData}
              />
            </Modal>
          )}
          {showSingleModal && (
            <Modal>
              <Wow>
                <Button2 onClick={handleShowSingleModal}>
                  <i class="bx bx-x-circle"></i>
                </Button2>
              </Wow>
              <SeeAnnouncements
                id={announcement.id}
                announcements={announcement.announcement}
                featured={announcement.featured}
              />
            </Modal>
          )}
          <Deev>
            <h2>All Slideshow</h2>
            <Button1 onClick={handleShowModal1}>
              <i class="bx bxs-megaphone"></i> Add Slideshow
            </Button1>
          </Deev>
          {leSuccess && <SuccessModel />}
          <Ul>
            {data.map((item) => (
              <Li color={item.color} key={item._id}>
                <Img src={item.img} alt="userImage" />
                <Information width="150px">{item.title}</Information>
                <Information width="220px">{item.link}</Information>
                <Information>
                  <Button href={`/product/${item._id}`} color="green">
                    <i class="bx bx-window-open"></i>
                  </Button>
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
                onDelete={() => handleDelete(itemToDelete._id)}
                onCancel={() => setShowModal(false)}
              />
            </div>
          )}
        </Div>
      )}
    </div>
  );
};
export default Slideshow;
