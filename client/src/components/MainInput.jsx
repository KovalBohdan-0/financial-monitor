import { styled } from '@mui/system';
import { Colors } from '../styles';
import { Box } from '@mui/material';
import SearchIcon from '/searchnormal1.svg';
const Input = styled('input')({
  width: '184px',
  padding: '27px 50px 12px 27px',
  fontSize: '147x',
  border: '1px solid',
  borderColor: Colors.white,
  borderRadius: '13px',
  fontFamily: 'Rowdies, sans-serif',
  color: Colors.white,
  backgroundColor: Colors.primary,
});

function MainInput(props) {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box
        sx={{
          marginLeft: '10px',
          marginRight: '-70px',
          zIndex: '3',
          fontSize: '10px',
          color: Colors.transactionColor,
        }}
      >
        Сума депозиту
      </Box>
      <Input {...props} />
      <Box
        src={SearchIcon}
        alt='Search Icon'
        style={{
          color: Colors.white,
          marginLeft: '-40px',
          marginBottom: '-6px',
        }}
      >
        ₴
      </Box>
    </Box>
  );
}
export default MainInput;
