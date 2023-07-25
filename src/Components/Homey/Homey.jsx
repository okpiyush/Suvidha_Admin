import React, { useContext,useEffect,useState  } from 'react'
import styled from 'styled-components';
import Graph from './Graph';
import Summary from './Summary';
import "./chart.css"
import NewUser from './NewUser';
import NewOrder from './NewOrder';
import { useHook} from '../../Hooks/useHook';
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
  width:98vw;
  
  display:flex;
  flex-direction:${props=>props.direction?props.direction:"column"};
  justify-content:space-around;
  align-items:center;
  overflow:auto;
`
const NewOrders=styled.div``

const Homey = (props) => {
  const {loginData}=useContext(LoginContext);
  const url="https://businessmanagementsolutionapi.onrender.com/api/users/stats"
  const url1="https://businessmanagementsolutionapi.onrender.com/api/products/stats"
  const temp=useHook(url,loginData.accessToken);
  const temp1=useHook(url1,loginData.accessToken);
  const userData=!temp?[]:temp;
  const productData=!temp1?[]:temp1;
  console.log(productData);
  const sortedUserData = userData.slice().sort((a, b) => a._id - b._id);
  const sortedProductData=productData.slice().sort((a, b) => a._id - b._id);
  const [direction, setDirection] = useState('row');

  useEffect(() => {
    // Function to update the direction based on the device width
    const handleDirectionChange = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      setDirection(isMobile ? 'column' : 'row');
    };

    // Set initial direction on component mount
    handleDirectionChange();

    // Add event listener for direction change on window resize
    window.addEventListener('resize', handleDirectionChange);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleDirectionChange);
    };
  }, []);
  return (
    <Wrapper>
      <Summary/>
      {/* total sales graph */}
      <Wrapper className="shadow" direction={direction}>
        <Graph data={sortedUserData} title="User Analytics" grid dataKey="total"/>
        <Graph data={sortedProductData} title="Products Added" grid dataKey="total"/>
        <Graph data={sortedUserData} title="sales" grid dataKey="total"/>
      </Wrapper>
      <New className='shadow' direction={direction}>
          <NewUser direction={direction}/>
          <NewOrder direction={direction}/>
      </New>
    </Wrapper>
  )
}

export default Homey;