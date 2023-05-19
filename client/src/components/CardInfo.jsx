import { Box } from '@mui/material';
import { Colors } from '../styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
function CardInfo(props) {
  const [isDepo, setIsDepo] = useState([]);
  const [isCreadite, setIsCreadite] = useState([]);

  useEffect(() => {
    async function getData() {
      const responseData = localStorage.getItem('responseData');
      let parsedData;

      if (responseData) {
        parsedData = JSON.parse(responseData);
      }

      try {
        const response = await axios.get(
          'https://financial-monitor-production.up.railway.app/api/v1/credit/all-by-customer',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${parsedData}`,
            },
          }
        );

        const responseDepo = await axios.get(
          'https://financial-monitor-production.up.railway.app/api/v1/deposit/all-by-customer',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${parsedData}`,
            },
          }
        );
        setIsDepo(responseDepo.data);
        console.log(responseDepo.data);

        setIsCreadite(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log('Error:', error.message);
        }
      }
    }
    getData();
  }, []);
  return (
    <Box display={'flex'} gap='50px' {...props}>
      <Box
        sx={{
          width: '265px',
          height: '170px',
          backgroundColor: Colors.diagramColorMain,
          borderRadius: '15px',
          padding: '10px',
        }}
      >
        Ваші депозити
        {isDepo.map((item) => {
          const { id, money, percent } = item;
          return (
            <Box key={id} sx={{ color: 'white' }}>
              Id: {id}, Сума: {money} {percent}%
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          width: '265px',
          height: '170px',
          backgroundColor: Colors.diagramColorMain,
          borderRadius: '15px',
          padding: '10px',
        }}
      >
        {' '}
        Ваші кредити
        {isCreadite.map((item) => {
          const { id, money, percent } = item;
          return (
            <Box key={id} sx={{ color: 'white' }}>
              {money}
              {percent}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default CardInfo;
