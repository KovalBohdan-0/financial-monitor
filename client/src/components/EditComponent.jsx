import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Container } from '@mui/material';
import { Colors } from '../styles';
import Button from '@mui/material/Button';
import axios from 'axios';

function EditComponent() {
  const [activeButton, setActiveButton] = useState('Кредит');
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  async function deleteBtn(id) {
    const responseData = localStorage.getItem('responseData');
    let parsedData;

    if (responseData) {
      parsedData = JSON.parse(responseData);
    }

    try {
      axios
        .delete(
          `https://financial-monitor-production.up.railway.app/api/v1/credit/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${parsedData}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          // Update the data state by removing the deleted item
          setData((prevData) => prevData.filter((item) => item.id !== id));
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.message);
          } else {
            console.log('Error:', error.message);
          }
        });
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  async function editBtn(id) {
    const responseData = localStorage.getItem('responseData');
    let parsedData;

    if (responseData) {
      parsedData = JSON.parse(responseData);
    }

    try {
      await axios.put(
        `https://financial-monitor-production.up.railway.app/api/v1/credit/${id}`,
        { money: editValue },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData}`,
          },
        }
      );

      // Clear the edit fields
      setEditId('');
      setEditValue('');
      // Fetch updated data
      getData();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error:', error.message);
      }
    }
  }

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
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log('Error:', error.message);
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
        Редагування
      </Typography>
      <Container
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '55px' }}
      >
        <Stack direction='row'>
          <Button
            color={activeButton === 'Кредит' ? 'primary' : 'fourth'}
            sx={{
              backgroundColor: activeButton === 'Кредит' ? 'white' : '',
            }}
            onClick={() => {
              handleButtonClick('Кредит');
            }}
          >
            Кредит
          </Button>
          <Button
            color={activeButton === 'Депозит' ? 'primary' : 'fourth'}
            sx={{ backgroundColor: activeButton === 'Депозит' ? 'white' : '' }}
            onClick={() => {
              handleButtonClick('Депозит');
            }}
          >
            Депозит
          </Button>
          <Button
            color={activeButton === 'Дохід' ? 'primary' : 'fourth'}
            sx={{
              backgroundColor: activeButton === 'Дохід' ? 'white' : '',
            }}
            onClick={() => {
              handleButtonClick('Дохід');
            }}
          >
            Дохід
          </Button>
          <Button
            color={activeButton === 'Витрати' ? 'primary' : 'fourth'}
            sx={{ backgroundColor: activeButton === 'Витрати' ? 'white' : '' }}
            onClick={() => {
              handleButtonClick('Витрати');
            }}
          >
            Витрати
          </Button>
        </Stack>
      </Container>
      <Box>
        <Box marginLeft='70px'>
          <Typography
            fontFamily={'Rowdies, sans-serif'}
            fontSize='27px'
            fontWeight={700}
            color={Colors.white}
          >
            {activeButton === 'Кредит' ? 'Оформлені кредити' : null}
            {activeButton === 'Депозит' ? 'Оформлені депозити' : null}
            {activeButton === 'Дохід' ? 'Оформлені доходи' : null}
            {activeButton === 'Витрати' ? 'Оформлені витрати' : null}
          </Typography>
        </Box>
        <Box>
          {data.map((item) => {
            return (
              <div key={item.id}>
                {editId === item.id ? (
                  <>
                    <input
                      type='text'
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button onClick={() => editBtn(item.id)}>save</button>
                    <button onClick={() => setEditId('')}>cancel</button>
                  </>
                ) : (
                  <>
                    {item.money}
                    <button onClick={() => deleteBtn(item.id)}>delete</button>
                    <button onClick={() => setEditId(item.id)}>edit</button>
                  </>
                )}
              </div>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default EditComponent;
