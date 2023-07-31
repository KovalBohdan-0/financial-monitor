import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import api from "../../enviroment.jsx";
function Credit() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState(null);
  const [editDuration, setEditDuration] = useState(null);

  async function deleteBtn(id) {
    const responseData = localStorage.getItem('responseData');
    let parsedData;

    if (responseData) {
      parsedData = JSON.parse(responseData);
    }

    try {
      axios
        .delete(
          `${api}/credit/${id}`,
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
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getDay() + Number(editDuration));
    const formattedTime = currentDate.toISOString().split(' ')[0]; // Format: hh:mm:ss
    const responseData = localStorage.getItem('responseData');
    let parsedData;

    if (responseData) {
      parsedData = JSON.parse(responseData);
    }
    console.log(id);
    console.log(editValue);
    console.log(editDuration);
    console.log(formattedTime);
    try {
      await axios.put(
        `${api}/credit`,
        {
          id: id,
          money: Number(editValue),
          percent: Number(editDuration),
          endTime: formattedTime,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData}`,
          },
        }
      );
      console.log(formattedTime);
      console.log(editDuration);
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
        `${api}/credit/all-by-customer`,
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
        fontFamily='Rowdies, sans-serif'
        fontSize='27px'
        fontWeight={700}
        color='white'
      >
        Оформлені кредити
      </Typography>
      <Box style={{ height: '400px', overflowY: 'scroll' }}>
        {data.map((item) => (
          <Box key={item.id}>
            {editId === item.id ? (
              <>
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    placeholder='Введіть Суму'
                    type='number'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    inputProps={{
                      style: {
                        color: 'white',
                        fontFamily: 'Rowdies, sans-serif',
                      },
                    }}
                  />
                  <TextField
                    placeholder='Введіть Тривалість (Міс)'
                    type='number'
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    inputProps={{
                      style: {
                        color: 'white',
                        fontFamily: 'Rowdies, sans-serif',
                      },
                    }}
                  />
                  <Box style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Button
                      onClick={() => editBtn(item.id)}
                      style={{
                        backgroundColor: 'white',
                        color: 'primary',
                        marginRight: '10px',
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditId('')}
                      style={{ backgroundColor: 'white', color: 'primary' }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </>
            ) : (
              <>
                <Box style={{ marginBottom: '10px' }}>
                  Ваш ID {item.id} сума {item.money}₴
                </Box>
                <Box style={{ marginBottom: '10px' }}>
                  <Button
                    onClick={() => deleteBtn(item.id)}
                    style={{
                      backgroundColor: 'white',
                      color: 'primary',
                      marginRight: '10px',
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => setEditId(item.id)}
                    style={{ backgroundColor: 'white', color: 'primary' }}
                  >
                    Edit
                  </Button>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Credit;
