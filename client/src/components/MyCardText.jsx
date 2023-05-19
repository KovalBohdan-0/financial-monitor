import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
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
MyCardText.propTypes = {
  text: PropTypes.string.isRequired,
};
export default MyCardText;
