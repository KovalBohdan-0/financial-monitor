import { styled } from '@mui/system';
import { Colors } from '../styles';

const AuthorisationBtn = styled('button')({
  fontSize: '16px',
  backgroundColor: Colors.primary,
  fontFamily: 'Inter, sans-serif',
  borderRadius: '49px',
  color: Colors.white,
  border: 'none',
  padding: '16px 46px',
  cursor: 'pointer',
});

function AuthorBtn(props) {
  return <AuthorisationBtn {...props}>{props.text}</AuthorisationBtn>;
}
export default AuthorBtn;
