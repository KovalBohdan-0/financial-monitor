import { Box } from '@mui/material';
import { Colors } from '../styles';
function CardInfo(props) {
  return (
    <Box display={'flex'} gap='50px' {...props}>
      <Box
        sx={{
          width: '265px',
          height: '170px',
          backgroundColor: Colors.diagramColorMain,
          borderRadius: '15px',
        }}
      >
        CardInfo
      </Box>
      <Box
        sx={{
          width: '265px',
          height: '170px',
          backgroundColor: Colors.diagramColorMain,
          borderRadius: '15px',
        }}
      >
        CardInfo
      </Box>
    </Box>
  );
}

export default CardInfo;
