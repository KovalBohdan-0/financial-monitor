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
import PropTypes from 'prop-types';

const Item = styled(Paper)(() => ({
  textAlign: 'center',
  fontSize: '17px',
}));

MainNavigation.propTypes = {
  value: PropTypes.string.isRequired,
};

const ItemLink = styled(Link)(({ isselected }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontFamily: 'Rowdies, sans-serif',
  fontWeight: isselected ? 'bold' : 'normal',
}));

export default function MainNavigation({ value }) {
  const selectedItem = value;
  return (
    <Box sx={{ width: 200, marginTop: '15px' }}>
      <Stack spacing='20px'>
        <Item elevation={0}>
          <ItemLink
            to='/main'
            isselected={selectedItem === '/main' ? value : undefined}
          >
            <img src={HomeIcon} alt='HomeIcon' /> Головна
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/stats'
            isselected={selectedItem === '/stats' ? value : undefined}
          >
            <img src={StatsIcon} alt='StatsIcon' />
            Статистика
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/transactions'
            isselected={selectedItem === '/transactions' ? value : undefined}
          >
            <img src={TransactIcon} alt='TransactIcon' />
            Транзакції
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/settings'
            isselected={selectedItem === '/settings' ? value : undefined}
          >
            <img src={SettingIcon} alt='SettingIcon' />
            Налаштування
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink
            to='/zvit'
            isselected={selectedItem === '/zvit' ? value : undefined}
          >
            <img src={ZvitIcon} alt='ZvitIcon' />
            Звіти
          </ItemLink>
        </Item>
      </Stack>
    </Box>
  );
}
