import { Box, Typography } from '@mui/material';
import { Colors } from '../styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CardInfo(props) {
  const [isDepo, setIsDepo] = useState([]);
  const [isCreadite, setIsCreadite] = useState([]);
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
          'https://financial-monitor-production.up.railway.app/api/v1/credit/info',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${parsedData}`,
            },
          }
        );

        const responseDepo = await axios.get(
          'https://financial-monitor-production.up.railway.app/api/v1/deposit/info',
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

        setIsLoading(false); // Data loading complete
      } catch (error) {
        setIsLoading(false); // Data loading complete
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log('Error:', error.message);
        }
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return (
      <Typography variant='h2' color='primary'>
        Loading...
      </Typography>
    ); // Render loading message
  }
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
        <Typography color='white' mb='5px'>
          Ваші депозити
        </Typography>{' '}
        <Typography color='white' mb='5px'>
          Отримаєте : {parseInt(isDepo.moneyThatWillGet)}₴
        </Typography>{' '}
        <Typography color='white'>
          {' '}
          Кількість : {isDepo.depositsCount}
        </Typography>{' '}
        <Typography color='white'>
          {' '}
          Найшвидший час закінчення :{' '}
          {new Date(isDepo.firstEndingDepositTime).toLocaleString()}
        </Typography>{' '}
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
        <Typography color='white' mb='5px'>
          Ваші кредити
        </Typography>{' '}
        <Typography color='white' mb='5px'>
          Потрібно оплатити : {parseInt(isCreadite.moneyToPay)}₴
        </Typography>{' '}
        <Typography color='white'>
          {' '}
          Кількість : {isCreadite.creditsCount}
        </Typography>{' '}
        <Typography color='white' mb='5px'>
          {' '}
          Найшвидший час закінчення :{' '}
          {new Date(isCreadite.firstEndingCreditTime).toLocaleString()}
        </Typography>{' '}
      </Box>
    </Box>
  );
}

export default CardInfo;
