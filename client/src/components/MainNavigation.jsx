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
const Item = styled(Paper)(() => ({
  textAlign: 'center',
  fontSize: '17px',
}));

const ItemLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontFamily: 'Rowdies, sans-serif',
}));

export default function MainNavigation() {
  return (
    <Box sx={{ width: 200, marginTop: '15px' }}>
      <Stack spacing='20px'>
        <Item elevation={0}>
          <ItemLink to='/main'>
            <img src={HomeIcon} alt='HomeIcon' /> Головна
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink to='/stats'>
            <img src={StatsIcon} alt='StatsIcon' />
            Статистика
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink to='/transactions'>
            <img src={TransactIcon} alt='TransactIcon' />
            Транзакції
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink to='/settings'>
            <img src={SettingIcon} alt='SettingIcon' />
            Налаштування
          </ItemLink>
        </Item>
        <Item elevation={0}>
          <ItemLink to='/zvit'>
            <img src={ZvitIcon} alt='ZvitIcon' />
            Звіти
          </ItemLink>
        </Item>
      </Stack>
    </Box>
  );
}
