import { useContext, useState } from "react";
import { LoginContext } from '../../Context/LoginContext';
import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Graph = ({ data, title, dataKey, grid }) => {
  const {loginData}=useContext(LoginContext);
  const[predictedData,setPredictedData]=useState(false);
  const mapIdToMonth = (_id) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Subtract 1 from _id to match array index
    const index = _id -1;
  
    // Return month name based on index
    return monthNames[index];
  };
  const pushToFind=async(data,type)=>{
    console.log(data);
    //converting the data into data points of a 2d array.
    const map=[];
    const find=[];
    if(type==="login"){
      data.map((item)=>{
        map.push([item._id,item.total]);
        find.push([item.id]);
        return 1; 
      })
    }
    //send the converted data to the api call
    const url="https://businessmanagementsolutionapi.onrender.com/api/find/predicted"
    const headers={
      "token":`Bearer ${loginData.accessToken}`
    }
    const payload={
      twodArray:map,
      toFind:find
    }
    let predicted=await axios.post(url,payload,{headers});
    console.log(predicted);
    data.map((item,num)=>{
      item["predict"] = Number(((predicted?.data[num-1] || [])[item._id]));
      return 1;
    });
    setPredictedData(true);
  }
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-wrapper">
        <div className="buttons"><button className="button" onClick={()=>pushToFind(data,"login")}>Predict future</button><button className="button">Download Data</button></div>
        <ResponsiveContainer width={500} height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis dataKey="_id" stroke="#5550bd" tickFormatter={mapIdToMonth} />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" strokeWidth={2} dot={{ r:3}} activeDot={{ r: 5}} />
            {predictedData &&<Line type="monotone" dataKey="predict" stroke="#000" strokeWidth={2} dot={{ r:3}} activeDot={{ r: 5}} />}
            <Tooltip cursor={{ stroke: '#5550bd', strokeWidth: 1 }} contentStyle={{ backgroundColor: '#fff' }} />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
