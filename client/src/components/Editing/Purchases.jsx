import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
function Purchases() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState(null);

  async function deleteBtn(id) {
    const responseData = localStorage.getItem('responseData');
    let parsedData;

    if (responseData) {
      parsedData = JSON.parse(responseData);
    }

    try {
      axios
        .delete(
          `https://financial-monitor-production.up.railway.app/api/v1/expense/${id}`,
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
    console.log(id);
    console.log(editValue);
    try {
      await axios.put(
        `https://financial-monitor-production.up.railway.app/api/v1/expense`,
        {
          id: id,
          money: Number(editValue),
        },
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
        'https://financial-monitor-production.up.railway.app/api/v1/expense/all-by-customer',
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
    <Box marginLeft='0px'>
      <Typography
        fontFamily='Rowdies, sans-serif'
        fontSize='27px'
        fontWeight={700}
        color='white'
      >
        Витрати
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
    </Box>
  );
}

export default Purchases;
