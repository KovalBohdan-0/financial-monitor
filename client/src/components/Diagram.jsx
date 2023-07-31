import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Colors } from '../styles';
import api from "../enviroment.jsx";

function Diagram() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function getData() {
      const responseData = localStorage.getItem('responseData');
      let parsedData;

      if (responseData) {
        parsedData = JSON.parse(responseData);
      }

      try {
        const response = await axios.get(
          `${api}/report/monthly-report/2023`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${parsedData}`,
            },
          }
        );
        setData(response.data);
        setIsLoading(false); // Data loading complete
      } catch (error) {
        setIsLoading(false); // Data loading complete
      }
    }
    getData();
  }, []);

  const formatXAxisTick = (value) => value.substring(0, 3); // Extract first three letters

  if (isLoading) {
    return (
      <Typography variant='h2' color='primary'>
        Loading...
      </Typography>
    ); // Render loading message
  }

  return (
    <AreaChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 10, right: 150, left: 20, bottom: 0 }}
    >
      <defs>
        <linearGradient id='colorВитрати' x1='0' y1='0' x2='0' y2='1'>
          <stop
            offset='5%'
            stopColor={Colors.diagramColorMain}
            stopOpacity={0.8}
          />
          <stop
            offset='95%'
            stopColor={Colors.diagramColorMain}
            stopOpacity={0}
          />
        </linearGradient>
        <linearGradient id='colorДохід' x1='0' y1='0' x2='0' y2='1'>
          <stop
            offset='5%'
            stopColor={Colors.diagramColorSecondary}
            stopOpacity={0.8}
          />
          <stop
            offset='95%'
            stopColor={Colors.diagramColorSecondary}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <XAxis
        dataKey='month'
        tickFormatter={formatXAxisTick}
        tick={{ fill: Colors.black }}
      />
      <YAxis
        tickFormatter={(value) => `₴${value}`}
        tick={{ fill: Colors.black }}
      />
      <CartesianGrid vertical={false} />
      <Tooltip formatter={(value) => `₴${value}`} />
      <Area
        type='monotone'
        dataKey='sumOfExpense'
        stroke={Colors.diagramColorMain}
        fillOpacity={1}
        fill='url(#colorВитрати)'
      />
      <Area
        type='monotone'
        dataKey='sumOfIncome'
        stroke={Colors.diagramColorSecondary}
        fillOpacity={1}
        fill='url(#colorДохід)'
      />
    </AreaChart>
  );
}

export default Diagram;
