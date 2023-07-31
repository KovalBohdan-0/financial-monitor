import Logo from '/logo.svg';
import { Box } from '@mui/material';
import MainText from '../components/MainText';
import Person from '/Person-Pose.svg';
import DepoActive from '/Depo-active.svg';
import Depo from '/депозит.svg';
import PurchaseActive from '/покупки-active.svg';
import Purchase from '/покупки.svg';
import CreaditeActive from '/кредит-active.svg';
import Creadite from '/кредит.svg';
import IncomeActive from '/дохід-active.svg';
import Income from '/дохід.svg';
import EditActive from '/редагування-active.svg';
import Edit from '/редагування.svg';
import { useEffect, useState } from 'react';
import MainNavigation from '../components/MainNavigation';
import { Colors } from '../styles';
import { Typography } from '@mui/material';
import { TransactDepo } from '../components/Transact';
import { TransactCredit } from '../components/Transact';
import PurchaseComponent from '../components/Purchase';
import IncomeComponent from '../components/Income';
import EditComponent from '../components/EditComponent';
import axios from 'axios';
import api from "../enviroment.jsx";
function Transactions() {
  const [data, setData] = useState([]);
  const [isDepo, setIsDepo] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);
  const [isCreadite, setIsCreadite] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleDepo = () => {
    setIsDepo((prevIsActive) => !prevIsActive);
    setIsPurchase(false);
    setIsCreadite(false);
    setIsIncome(false);
    setIsEdit(false);
  };

  const togglePurchase = () => {
    setIsDepo(false);
    setIsPurchase((prevIsActive) => !prevIsActive);
    setIsCreadite(false);
    setIsIncome(false);
    setIsEdit(false);
  };

  const toggleCreadite = () => {
    setIsDepo(false);
    setIsPurchase(false);
    setIsCreadite((prevIsActive) => !prevIsActive);
    setIsIncome(false);
    setIsEdit(false);
  };
  const toggleIncome = () => {
    setIsDepo(false);
    setIsPurchase(false);
    setIsCreadite(false);
    setIsIncome((prevIsActive) => !prevIsActive);
    setIsEdit(false);
  };
  const toggleEdit = () => {
    setIsDepo(false);
    setIsPurchase(false);
    setIsCreadite(false);
    setIsIncome(false);
    setIsEdit((prevIsActive) => !prevIsActive);
  };

  useEffect(() => {
    async function getData() {
      const responseData = localStorage.getItem('responseData');
      let parsedData;

      if (responseData) {
        parsedData = JSON.parse(responseData);
      }

      try {
        const response = await axios.get(
          '${apiUrl}/report/monthly-report/2023',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${parsedData}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log('Error:', error.message);
        }
      }
    }
    getData();
  }, [isPurchase, isIncome, isEdit]);
  return (
    <>
      <Box m='0 auto' width='1280px' padding='43px 66px'>
        <Box display={'flex'} gap={'60px'} alignItems={'center'}>
          <Box>
            <img src={Logo} alt='Logo' />
          </Box>
          <Box display={'flex'} alignItems={'center'} gap='200px'>
            <MainText value1='Транзакції' />
          </Box>
        </Box>
        <Box display={'flex'} gap={'17px'} mt='36px'>
          <Box>
            <MainNavigation value={'/transactions'} />
            <Box mt='125px'>
              <img src={Person} alt='' />
            </Box>
          </Box>
          <Box>
            <Box marginBottom='25px' display={'flex'} gap='10px'>
              <img
                onClick={toggleDepo}
                src={isDepo ? DepoActive : Depo}
                alt='isDepo'
              />

              <img
                onClick={toggleCreadite}
                src={isCreadite ? CreaditeActive : Creadite}
                alt='isCreadite'
              />
              <img
                onClick={togglePurchase}
                src={isPurchase ? PurchaseActive : Purchase}
                alt='isPurchase'
              />
              <img
                onClick={toggleIncome}
                src={isIncome ? IncomeActive : Income}
                alt='isIncome'
              />
              <img
                onClick={toggleEdit}
                src={isEdit ? EditActive : Edit}
                alt='isEdit'
              />
            </Box>
            <Box
              width='896px'
              borderRadius='25px'
              sx={{ backgroundColor: Colors.primary }}
              padding={'36px 145px 92px 50px'}
            >
              <Typography
                fontFamily={'Rowdies, sans-serif'}
                fontSize='28px'
                fontWeight={700}
                textAlign={'center'}
                color={Colors.white}
              >
                {!isDepo &&
                  !isPurchase &&
                  !isCreadite &&
                  !isIncome &&
                  !isEdit &&
                  'Всі транзакції'}
              </Typography>
              <Box>
                {isPurchase && <PurchaseComponent />}
                {isDepo && <TransactDepo />}
                {isCreadite && <TransactCredit />}
                {isIncome && <IncomeComponent />}
                {isEdit && <EditComponent />}
                {!isDepo &&
                  !isPurchase &&
                  !isCreadite &&
                  !isIncome &&
                  !isEdit && (
                    <Box style={{ height: '400px', overflowY: 'scroll' }}>
                      {data.map((item, idx) => {
                        return (
                          <Box
                            key={idx}
                            style={{
                              marginTop: '10px',
                              marginBottom: '10px',
                              fontFamily: 'Rowdies, sans-serif',
                              color: Colors.white,
                            }}
                          >
                            Місяць {item.month} сума доходу {item.sumOfIncome}₴
                            сума витрат {item.sumOfExpense}$
                          </Box>
                        );
                      })}
                    </Box>
                  )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Transactions;
