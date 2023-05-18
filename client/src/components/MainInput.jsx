import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Colors } from '../styles';
import StyledInput from './styledInput';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
function MainInput() {
  const [depo, setDepo] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);

    if (value.trim() === '' || isNaN(numericValue)) {
      setDepo(0);
    } else {
      setDepo(numericValue);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
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
    console.log('Depo:', depo);
    console.log('Slider Value:', sliderValue);
    console.log('formattedTime', formattedTime);
    const Depo = {
      money: depo,
      description: '',
      percent: sliderValue,
      endTime: formattedTime,
    };
    try {
      const response = await axios.post(
        'https://financial-monitor-production.up.railway.app/api/v1/deposit',
        Depo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData}`,
          },
        }
      );
      console.log(response.data);

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
      <form onSubmit={formSubmit}>
        <Typography
          fontFamily={'Rowdies, sans-serif'}
          fontSize='15px'
          fontWeight={700}
          color={Colors.white}
        >
          Введіть суму, яку хочете примножити
        </Typography>
        <Box display='flex' gap='40px'>
          <StyledInput
            min={1000}
            placeholder='Сума депозиту'
            value={depo}
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
            }}
          >
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              color='fourth'
              defaultValue={0}
              step={1}
              min={0}
              max={12}
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
          Відкрити депозит
        </Button>
      </form>
    </>
  );
}

export default MainInput;
