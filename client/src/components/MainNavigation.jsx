import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '/home.svg';
import StatsIcon from '/stats.svg';
import TransactIcon from '/transaction.svg';
import SettingIcon from '/setting.svg';
import ZvitIcon from '/zvitIcon.svg';
import { useState } from 'react';
const Item = styled(Paper)(() => ({
  textAlign: 'center',
  fontSize: '17px',
}));

const ItemLink = styled(Link)(({ isselected }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontFamily: 'Rowdies, sans-serif',
  fontWeight: isselected ? 'bold' : 'normal',
}));

export default function MainNavigation() {
  const [selectedItem, setSelectedItem] = useState('/main');
  return (
    <Box sx={{ width: 200, marginTop: '15px' }}>
      <Stack spacing='20px'>
        <Item elevation={0}>
          <ItemLink
            to='/main'
            isselected={selectedItem === '/main'}
            onClick={() => setSelectedItem('/main')}
          >
            <img src={HomeIcon} alt='HomeIcon' /> Головна
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/stats'
            isselected={selectedItem === '/stats'}
            onClick={() => setSelectedItem('/stats')}
          >
            <img src={StatsIcon} alt='StatsIcon' />
            Статистика
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/transactions'
            isselected={selectedItem === '/transactions'}
            onClick={() => setSelectedItem('/transactions')}
          >
            <img src={TransactIcon} alt='TransactIcon' />
            Транзакції
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/settings'
            isselected={selectedItem === '/settings'}
            onClick={() => setSelectedItem('/settings')}
          >
            <img src={SettingIcon} alt='SettingIcon' />
            Налаштування
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/zvit'
            isselected={selectedItem === '/zvit'}
            onClick={() => setSelectedItem('/zvit')}
          >
            <img src={ZvitIcon} alt='ZvitIcon' />
            Звіти
          </ItemLink>
        </Item>
      </Stack>
    </Box>
  );
}
