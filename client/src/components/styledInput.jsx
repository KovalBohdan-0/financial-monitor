import { styled } from '@mui/system';
import { Colors } from '../styles';
import { Box } from '@mui/material';
const Input = styled('input')({
  width: '184px',
  padding: '17px 60px 17px 16px',
  fontSize: '17px',
  border: '1px solid #D9D9D9',
  borderRadius: '13px',
  fontFamily: 'Rowdies, sans-serif',
  color: Colors.white,
  backgroundColor: Colors.primary,
  '&::placeholder': {
    color: 'white', // Set the color of the placeholder text to white
  },
});

function StyledInpit(props) {
  return (
    <Box display={'flex'}>
      <Input {...props}  />
      <Box color='white' sx={{ marginLeft: '-30px', marginTop: '20px' }}>
        ₴
      </Box>
    </Box>
  );
}
export default StyledInpit;
