import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Container } from '@mui/material';
import { Colors } from '../styles';
import StyledInput from './styledInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import PersonResponse from '/Person-Modal.svg';
import Confirmation from '/confirmation.svg';

function PurchaseComponent() {
  const [credit, setCredit] = useState(0);
  const [activeButton, setActiveButton] = useState('Шопінг');
  const [message, setMessage] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

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
    }

    const Credit = {
      money: credit,
      description: activeButton,
      creationTime: formattedTime,
    };
    try {
      const response = await axios.post(
        'https://financial-monitor-production.up.railway.app/api/v1/expense',
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
        Типи витрат
      </Typography>
      <Container
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '55px' }}
      >
        <Stack direction='row'>
          <Button
            color={activeButton === 'Шопінг' ? 'primary' : 'fourth'}
            sx={{
              backgroundColor: activeButton === 'Шопінг' ? 'white' : '',
            }}
            onClick={() => {
              handleButtonClick('Шопінг');
              setCredit(0);
              setMessage(false);
            }}
          >
            Шопінг
          </Button>
          <Button
            color={activeButton === 'Таксі' ? 'primary' : 'fourth'}
            sx={{ backgroundColor: activeButton === 'Таксі' ? 'white' : '' }}
            onClick={() => {
              handleButtonClick('Таксі');
              setCredit(0);
              setMessage(false);
            }}
          >
            Таксі
          </Button>
          <Button
            color={activeButton === 'Відпочинок' ? 'primary' : 'fourth'}
            sx={{
              backgroundColor: activeButton === 'Відпочинок' ? 'white' : '',
            }}
            onClick={() => {
              handleButtonClick('Відпочинок');
              setCredit(0);
              setMessage(false);
            }}
          >
            Відпочинок
          </Button>
          <Button
            color={activeButton === 'Їжа' ? 'primary' : 'fourth'}
            sx={{ backgroundColor: activeButton === 'Їжа' ? 'white' : '' }}
            onClick={() => {
              handleButtonClick('Їжа');
              setCredit(0);
              setMessage(false);
            }}
          >
            Іжа та напої
          </Button>
        </Stack>
      </Container>
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
              Витрата успішно додана!
            </Typography>
            <img height={'155px'} src={PersonResponse} alt='' />
            <img height={'85px'} src={Confirmation} alt='' />
          </Box>
        )}
      </Box>
    </>
  );
}

export default PurchaseComponent;
