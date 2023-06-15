import React from 'react'
import styled, {keyframes} from 'styled-components'
import img from "./Loading.png"  
const spin =keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.img`
  position: fixed;
  height:100px;
  width:100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${spin} 1.5s linear infinite;
`;
const Loading = () => {
  return (
    <Loader src={img}/>
  )
}

export default Loading