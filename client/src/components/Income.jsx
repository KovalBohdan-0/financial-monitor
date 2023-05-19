import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Colors } from '../styles';
import StyledInput from './styledInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import PersonResponse from '/Person-Modal.svg';
import Confirmation from '/confirmation.svg';

function IncomeComponent() {
  const [credit, setCredit] = useState(0);
  const [message, setMessage] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);

    if (value.trim() === '' || isNaN(numericValue)) {
      setCredit(0);
    } else {
      setCredit(numericValue);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedTime = currentDate.toISOString().split(' ')[0]; // Format: hh:mm:ss
    const responseData = localStorage.getItem('responseData');
    console.log(responseData);
    let parsedData;

    if (responseData) {
      parsedData = JSON.parse(responseData);
      console.log(parsedData);
    }
    console.log('credit:', credit);
    console.log('formattedTime', formattedTime);

    const Credit = {
      money: credit,
      description: 'income',
      creationTime: formattedTime,
    };
    try {
      const response = await axios.post(
        'https://financial-monitor-production.up.railway.app/api/v1/income',
        Credit,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData}`,
          },
        }
      );
      console.log(response.data);
      setMessage(true);
      // Navigate to MainPage.js
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <>
      <Typography
        fontFamily={'Rowdies, sans-serif'}
        fontSize='28px'
        fontWeight={700}
        textAlign={'center'}
        color={Colors.white}
        marginBottom='30px'
      >
        Доходи
      </Typography>

      <Box display='flex' gap='100px'>
        <form onSubmit={formSubmit}>
          <Box marginLeft='70px'>
            <Typography
              fontFamily={'Rowdies, sans-serif'}
              fontSize='15px'
              fontWeight={700}
              color={Colors.white}
              marginBottom='17px'
            >
              Введіть суму яку ви витратили
            </Typography>

            <Box display='flex' gap='40px' marginBottom='40px'>
              <StyledInput
                min={1000}
                placeholder='Сума депозиту'
                value={credit}
                onChange={handleInputChange}
              />
              <Box
                sx={{
                  padding: '10px',
                  borderRadius: '13px',
                  border: '1px solid white',
                  color: 'white',
                  width: '90px',
                  height: '40px',
                  fontFamily: 'Rowdies, sans-serif',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    color: '#A5AEFF',
                    display: 'block',
                    marginBottom: '5px',
                  }}
                >
                  Валюта
                </span>
                <span>Гривня</span>
              </Box>
            </Box>

            <Button
              type='submit'
              variant='contained'
              color='fourth'
              sx={{
                color: Colors.diagramColorMain,
                fontFamily: 'Rowdies, sans-serif',
                fontWeight: '700',
                marginBottom: '54px',
              }}
            >
              Додати
            </Button>
          </Box>
        </form>
        {message && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography
              fontFamily={'Rowdies, sans-serif'}
              fontSize='24px'
              fontWeight={700}
              textAlign={'center'}
              color={Colors.white}
            >
              Ваш дохід додано!
            </Typography>
            <img height={'155px'} src={PersonResponse} alt='' />
            <img height={'85px'} src={Confirmation} alt='' />
          </Box>
        )}
      </Box>
    </>
  );
}

export default IncomeComponent;
