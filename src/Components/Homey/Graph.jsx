import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Graph = ({ data, title, dataKey, grid }) => {
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
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width={500} height={300}>
          <LineChart data={data}>
            <XAxis dataKey="_id" stroke="#5550bd" tickFormatter={mapIdToMonth}/>
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
