import React, { useContext } from 'react'
import styled from 'styled-components';
import Graph from './Graph';
import Summary from './Summary';
import "./chart.css"
import NewUser from './NewUser';
import NewOrder from './NewOrder';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';
const Wrapper=styled.div`
  width: ${props=>props.direction?"90vw":"100vw"};
  display:flex;
  flex-direction:${props=>props.direction?props.direction:"column"};
  justify-content:space-around;
  align-items:center;
  overflow:auto;
  padding-top:60px;
`
const New= styled.div`
  width:90vw;
  display:flex;
  flex-direction:${props=>props.direction?props.direction:"column"};
  justify-content:space-around;
  align-items:center;
  overflow:auto;
`
const NewOrders=styled.div``

const Homey = (props) => {
  const {loginData}=useContext(LoginContext);
  const url="http://localhost:5001/api/users/stats"
  const temp=useHook(url,loginData.accessToken);
  const userData=!temp?[]:temp;
  const sortedUserData = userData.slice().sort((a, b) => a.id - b.id);
  console.log(sortedUserData)
  const productData = [
    {
      name: "Jan",
      "Sales": 4000,
    },
    {
      name: "Feb",
      "Sales": 3000,
    },
    {
      name: "Mar",
      "Sales": 5000,
    },
  ];
  return (
    <Wrapper>
      <Summary/>
      {/* total sales graph */}
      <Wrapper className="shadow" height="20vh"direction="row">
        <Graph data={sortedUserData} title="User Analytics" grid dataKey="total"/>
        <Graph data={productData} title="Product Analytics" grid dataKey="Sales"/>
      </Wrapper>
      <New className='shadow' direction="row">
          <NewUser/>
          <NewOrder/>
      </New>
    </Wrapper>
  )
}

export default Homey;