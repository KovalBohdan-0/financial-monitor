import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

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

MainText.propTypes = {
  value1: PropTypes.string.isRequired,
  value2: PropTypes.string,
};

export default MainText;
