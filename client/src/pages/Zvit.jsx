import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import Logo from '/logo.svg';
import MainText from '../components/MainText';
import Person from '/Person-Pose.svg';
import MainNavigation from '../components/MainNavigation';
import { Colors } from '../styles';
import api from "../enviroment.jsx";

function Zvit() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    async function getData() {
      const responseData = localStorage.getItem('responseData');
      let parsedData;

      if (responseData) {
        parsedData = JSON.parse(responseData);
      }

      try {
        const response = await axios.get(
          `${api}/report/all-transactions`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${parsedData}`,
            },
          }
        );
        setData(response.data);
        setFilteredData(response.data);
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

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    const filtered = data.filter(
      ({ transactionType }) =>
        transactionType.toLowerCase() === type.toLowerCase()
    );
    setFilteredData(filtered);
  };

  const handleResetClick = () => {
    setTypeFilter('');
    setFilteredData(data);
  };

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortBy === 'money') {
        return sortOrder === 'asc'
          ? a.transaction.money - b.transaction.money
          : b.transaction.money - a.transaction.money;
      }
      if (sortBy === 'creationTime') {
        return sortOrder === 'asc'
          ? new Date(a.transaction.creationTime) -
              new Date(b.transaction.creationTime)
          : new Date(b.transaction.creationTime) -
              new Date(a.transaction.creationTime);
      }
      return 0;
    });

    setFilteredData(sortedData);
  }, [sortBy, sortOrder]);

  return (
    <>
      <Box m='0 auto' width='1280px' padding='43px 66px'>
        <Box display='flex' gap='60px' alignItems='center'>
          <Box>
            <img src={Logo} alt='Logo' />
          </Box>
          <Box display='flex' alignItems='center' gap='200px'>
            <MainText value1='Звіти' />
          </Box>
        </Box>
        <Box display='flex' gap='17px' mt='36px'>
          <Box>
            <MainNavigation value='/zvit' />
            <Box mt='125px'>
              <img src={Person} alt='' />
            </Box>
          </Box>
          <Box
            width='896px'
            borderRadius='25px'
            sx={{ backgroundColor: Colors.primary }}
            padding={'36px 145px 92px 50px'}
            style={{ height: '600px', overflowY: 'scroll' }}
          >
            <Box display='flex' alignItems='center' gap='20px' mb='20px'>
              <Button variant='contained' onClick={handleResetClick}>
                Reset Filter
              </Button>
            </Box>
            <Box display='flex' alignItems='center' gap='20px'>
              <Button
                variant='contained'
                onClick={() => handleTypeFilter('Credit')}
                disabled={typeFilter === 'Credit'}
              >
                Credit
              </Button>
              <Button
                variant='contained'
                onClick={() => handleTypeFilter('Deposit')}
                disabled={typeFilter === 'Deposit'}
              >
                Deposit
              </Button>
              <Button
                variant='contained'
                onClick={() => handleTypeFilter('Expense')}
                disabled={typeFilter === 'Expense'}
              >
                Expense
              </Button>
              <Button
                variant='contained'
                onClick={() => handleTypeFilter('Income')}
                disabled={typeFilter === 'Income'}
              >
                Income
              </Button>
              <Box display='flex' alignItems='center' gap='20px'>
                <Button
                  variant='contained'
                  onClick={() => handleSort('money')}
                  endIcon={
                    sortBy === 'money' &&
                    (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)
                  }
                >
                  Sort by Money
                </Button>
                <Button
                  variant='contained'
                  onClick={() => handleSort('creationTime')}
                  endIcon={
                    sortBy === 'creationTime' &&
                    (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)
                  }
                >
                  Sort by Creation Time
                </Button>
              </Box>
            </Box>
            <List>
              {filteredData.map(
                ({
                  id,
                  transactionType,
                  transaction: { money, percent, creationTime, endTime },
                }) => (
                  <ListItem key={id}>
                    <ListItemText
                      primary={`Тип: ${transactionType}`}
                      secondary={`Вартість: ${money}, Процент: ${percent}, Час створення: ${new Date(
                        creationTime
                      ).toLocaleString()}, Час закінчення: ${new Date(
                        endTime
                      ).toLocaleString()}`}
                      primaryTypographyProps={{
                        style: {
                          color: 'white',
                          fontFamily: 'Rowdies, sans-serif',
                        },
                      }}
                      secondaryTypographyProps={{
                        style: {
                          color: 'white',
                          fontFamily: 'Rowdies, sans-serif',
                        },
                      }}
                    />
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Zvit;
