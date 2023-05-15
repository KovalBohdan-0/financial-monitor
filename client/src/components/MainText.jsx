import { Typography } from '@mui/material';

function MainText({ value1, value2 = null }) {
  return (
    <>
      <Typography
        fontFamily={'Rowdies, sans-serif'}
        fontSize={37}
        fontWeight={700}
      >
        {value1}
      </Typography>
      {value2 ? (
        <Typography fontFamily={'Rowdies, sans-serif'} fontSize={16}>
          {value2}
        </Typography>
      ) : null}
    </>
  );
}

export default MainText;
