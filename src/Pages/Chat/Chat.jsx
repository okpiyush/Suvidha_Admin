import React from 'react';
import styled from "styled-components";
import io from 'socket.io-client';
import { useEffect } from 'react';
const Div=styled.div`
    padding-top:60px;
    display:flex;
    width:100vw;
    height:99.8vh;
    overflow:hidden;
`
const Nav=styled.div`
    flex:1;
    height:inherit;
    background-color:rgb(107, 60, 192);
    overflow-y:auto;
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #888;
        ${'' /* border-radius: 5px; */}
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
`
const Users=styled.ul`
    height:inherit;
    list-style-type:none;
    background-color:rgb(107, 60, 192);
`
const UserLi=styled.li`
    width:90%;
    height:40px;
    text-align:center;
    font-size:20px;
    margin-bottom:10px;
    background-color:rgb(119, 71, 207);
    &:hover{
        background-color:rgb(158, 71, 207);
    }
`
const ChatWindow=styled.div`
    flex:4;
    height:93vh;
    background-color:rgb(119, 71, 207);
    width:800px;

`
const Form=styled.form`
    width:100%;
    display:flex;
    
`
const Input=styled.input`
    flex:10;
    height:40px;
    margin:5px;
    border: none;
    border-radius:8px;
    padding-left:10px;
`
const Button=styled.button`
    flex:1;
    height:40px;
    margin:5px;
    border: none;
    border-radius:8px;
    padding-left:10px;
`
const ChatSize= styled.div`
    height:88%;
    
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #888;
        ${'' /* border-radius: 5px; */}
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
    overflow-y:auto;
`
const ChatDiv=styled.div`
    font-weight:700;
    display:flex;
    justify-content:${props=>props.self==="false"?"flex-start":"flex-end"}
`
const ChatText=styled.div`
    width:50%;
    padding:10px 10px 10px 30px;
    border-radius:10px;
    background-color:RGB(178, 211, 119); 
    margin:20px;
`
const Text=styled.div`
`
const Time=styled.div`
    width:100%;
    text-align:right;
    font-size:12px;
`
const Title=styled.div`
    width:100%;
    text-align:center;
    font-size:25px;
    font-weight:500;
    color:white;
    margin-bottom:30px;
`
const ChatTitle=styled.div`
    width:100%;
    posistion:absolute;
    z-index:2;
    color:black;
    background-color:RGB(150, 150, 150);
    text-align:center;
    font-size:25px;
    font-weight:500;
`


///socket io connection

const Chat = () => {
    useEffect(() => {
        //when the state mounts it gets executed
        const socket = io.connect("http://localhost:3002");
        //when it unmounts then it disconnect
        return () => {
          socket.disconnect();
        };
      }, []);
  return (
    <Div>
        <Nav>
            
            <Title>Customers</Title>
            <Users >
                
            </Users>
        </Nav>
        <ChatWindow>
            <ChatTitle>
                Anurag
            </ChatTitle>
            <ChatSize>
                <ChatDiv self="false">
                    <ChatText>
                        <Text>Hey</Text>
                        <Time>10:20pm</Time>
                    </ChatText>
                </ChatDiv>
                <ChatDiv self="true">
                    <ChatText>
                        <Text>Hey</Text>
                        <Time>10:20pm</Time>
                    </ChatText>
                </ChatDiv>
            </ChatSize>
            <Form>
                <Input placeholder='Type your message here'/>
                <Button>Send</Button>
            </Form>
        </ChatWindow>
    </Div>
  )
}

export default Chat