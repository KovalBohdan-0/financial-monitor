import { styled } from '@mui/system';
import { Colors } from '../styles';
import { Box } from '@mui/material';
import SearchIcon from '/searchnormal1.svg';
const Input = styled('input')({
  width: '203px',
  padding: '13px 50px 13px 20px',
  fontSize: '14px',
  border: 'none',
  borderRadius: '20px',
  fontFamily: 'Rowdies, sans-serif',
  color: Colors.inputMainText,
  backgroundColor: Colors.inputMainColor,
});

function MainInput(props) {
  return (
    <Box>
      <Input {...props} />
      <img
        src={SearchIcon}
        alt='Search Icon'
        style={{
          cursor: 'pointer',
          marginLeft: '-40px',
          marginBottom: '-6px',
        }}
      />
    </Box>
  );
}
export default MainInput;
