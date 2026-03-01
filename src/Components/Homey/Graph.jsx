import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import axios from "axios";

const ChartContainer = styled.div`
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SmallButton = styled.button`
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
  
  &.primary {
    background: var(--primary-light);
    color: var(--primary);
    border: 1px solid transparent;
    &:hover {
      background: var(--primary);
      color: white;
    }
  }

  &.secondary {
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--border);
    &:hover {
      border-color: var(--text-muted);
      color: var(--text-main);
    }
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white',
        padding: '0.75rem 1rem',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: 0, color: entry.color, fontSize: '0.8125rem', fontWeight: 600 }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Graph = ({ data, title, dataKey, grid }) => {
  const { loginData } = useContext(LoginContext);
  const [chartData, setChartData] = useState(data);
  const [predicting, setPredicting] = useState(false);
  const [hasPrediction, setHasPrediction] = useState(false);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const mapIdToMonth = (_id) => monthNames[(_id - 1) % 12];

  const handlePredict = async () => {
    if (hasPrediction || !data || data.length === 0) return;

    setPredicting(true);
    try {
      const map = data.map(item => [item._id, item[dataKey]]);
      const find = data.map(item => [item._id + 1]);

      const response = await axios.post(
        "http://localhost:5005/api/find/predicted",
        { twodArray: map, toFind: find },
        { headers: { "token": `Bearer ${loginData.accessToken}` } }
      );

      const newData = data.map((item, idx) => ({
        ...item,
        predict: idx > 0 ? Math.round(response.data[idx - 1][1]) : null
      }));

      setChartData(newData);
      setHasPrediction(true);
    } catch (err) {
      console.error("Prediction failed", err);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <h3>{title}</h3>
        <ButtonGroup>
          <SmallButton className="primary" onClick={handlePredict} disabled={predicting}>
            {predicting ? 'Wait...' : 'Predict Future'}
          </SmallButton>
          <SmallButton className="secondary">Export</SmallButton>
        </ButtonGroup>
      </ChartHeader>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="_id"
              tickFormatter={mapIdToMonth}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              name={title}
              stroke="var(--primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={{ r: 4, fill: 'white', strokeWidth: 2, stroke: 'var(--primary)' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            {hasPrediction && (
              <Line
                type="monotone"
                dataKey="predict"
                name="Prediction"
                stroke="var(--success)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

export default Graph;
