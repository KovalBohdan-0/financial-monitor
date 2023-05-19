import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Colors } from '../styles';
import StyledInput from './styledInput';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import PersonResponse from '/Person-Modal.svg';
import Confirmation from '/confirmation.svg';

TransactHOC.propTypes = {
  type: PropTypes.oneOf(['deposit', 'credit']).isRequired,
};

function TransactHOC({ type }) {
  const [amount, setAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [message, setMessage] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);

    if (value.trim() === '' || isNaN(numericValue)) {
      setAmount(0);
    } else {
      setAmount(numericValue);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + sliderValue);
    const formattedTime = currentDate.toISOString().split(' ')[0]; // Format: hh:mm:ss
    const responseData = localStorage.getItem('responseData');

    let parsedData;

    if (responseData) {
      parsedData = JSON.parse(responseData);
    }

    const transactionData = {
      money: amount,
      description: '',
      percent: sliderValue,
      endTime: formattedTime,
    };

    const apiUrl =
      type === 'deposit'
        ? 'https://financial-monitor-production.up.railway.app/api/v1/deposit'
        : 'https://financial-monitor-production.up.railway.app/api/v1/credit';

    try {
      const response = await axios.post(apiUrl, transactionData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData}`,
        },
      });
      console.log(response.data);

      setMessage(true);
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
        marginBottom='37px'
      >
        {type === 'deposit' ? 'Відкрити депозит' : 'Оформити кредит'}
      </Typography>
      <Box display='flex' gap='200px'>
        <form onSubmit={formSubmit}>
          <Typography
            fontFamily={'Rowdies, sans-serif'}
            fontSize='15px'
            fontWeight={700}
            color={Colors.white}
            marginBottom='17px'
          >
            {type === 'deposit'
              ? 'Введіть суму, яку хочете примножити'
              : 'Введіть суму, яку хочете отримати'}
          </Typography>
          <Box display='flex' gap='40px' marginBottom='46px'>
            <StyledInput
              min={1000}
              placeholder={
                type === 'deposit' ? 'Сума депозиту' : 'Сума кредиту'
              }
              value={amount}
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
          <Box width={300}>
            <Typography
              fontFamily={'Rowdies, sans-serif'}
              fontSize='15px'
              fontWeight={700}
              color={Colors.white}
              marginBottom='17px'
            >
              Термін (міс.)
            </Typography>
            <Box
              sx={{
                padding: '10px 0px 10px 30px',
                borderRadius: '13px',
                border: '1px solid white',
                color: 'white',
                width: '360px',
                marginBottom: '37px',
              }}
            >
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                color='fourth'
                defaultValue={1}
                step={1}
                min={1}
                max={24}
                valueLabelDisplay='auto'
                sx={{ width: '320px' }}
              />
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
            }}
          >
            {type === 'deposit' ? 'Відкрити депозит' : 'Оформити кредит'}
          </Button>
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
              {type === 'deposit'
                ? 'Ваш депозит відкрито!'
                : 'Ваш кредит оформлено!'}
            </Typography>
            <img height={'155px'} src={PersonResponse} alt='' />
            <img height={'85px'} src={Confirmation} alt='' />
          </Box>
        )}
      </Box>
    </>
  );
}

export default TransactHOC;
