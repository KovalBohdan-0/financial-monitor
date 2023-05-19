import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const AuthorisationButton = styled(Button)({
  padding: '16px 46px',
  fontSize: '16px',
  borderRadius: '50px',
});

function AuthorBtn({ text, ...props }) {
  return (
    <AuthorisationButton type='submit' variant='contained' {...props}>
      {text}
    </AuthorisationButton>
  );
}

AuthorBtn.propTypes = {
  text: PropTypes.string.isRequired,
};

export default AuthorBtn;
