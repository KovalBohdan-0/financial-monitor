import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Colors } from '../styles';

const Btn = styled('button')(({ background }) => ({
  fontFamily: 'Rowdies, sans-serif',
  fontSize: '12px',
  color: '#FFF',
  padding: '7px 13px',
  backgroundColor: background,
  borderRadius: '8px',
  border: 'none',
}));

function AnalitycsBtn() {
  return (
    <Box display='flex' gap='10px' margin='15px 0 30px 0'>
      <Btn background={Colors.diagramColorMain}>Витрати</Btn>
      <Btn background={Colors.diagramColorSecondary}>Дохід</Btn>
    </Box>
  );
}

export default AnalitycsBtn;
