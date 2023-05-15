import { Typography } from '@mui/material';

function MyCardText({ text }) {
  return (
    <Typography
      fontSize={30}
      fontFamily={'Rowdies, sans-serif'}
      fontWeight={700}
    >
      {text}
    </Typography>
  );
}

export default MyCardText;
