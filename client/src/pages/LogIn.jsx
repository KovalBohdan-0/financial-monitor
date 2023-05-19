import { useState, useEffect } from 'react';
import Logo from '/logo.svg';
import { Box, Typography, TextField } from '@mui/material';
import { Colors } from '../styles';
import AuthorBtn from '../components/ButtonSubmit';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MainText from '../components/MainText';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import People from '/people.png';
function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [userErrors, setUserErrors] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return errors;
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors;
    }
    setErrors(errors);
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = { email, password };
    if (validateForm()) {
      try {
        const response = await axios.post(
          'https://financial-monitor-production.up.railway.app/api/v1/login',
          login,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        localStorage.setItem('responseData', JSON.stringify(response.data.jwt));

        // Navigate to MainPage.js
        navigate('/main');
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          setUserErrors(error.response.data.message);
        } else {
          console.log('Error:', error.message);
        }
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallScreen(screenWidth <= 768); // Set the screen width threshold for small screens (e.g., iPad, iPhone)
    };

    handleResize(); // Call the function initially

    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener on component unmount
    };
  }, []);

  return (
    <Box
      sx={{
        width: isSmallScreen ? '100%' : '1280px',
        margin: '0 auto',
        padding: '33px 26px 26px 100px',
      }}
    >
      <Box display={'flex'} gap={'80px'}>
        <Box>
          <img src={Logo} alt='Budget Buddy' />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '80px',
            }}
          >
            <MainText
              value1='Почни вже зараз'
              value2=' Введіть свої дані для доступу до свого облікового запису'
            />
            <Box
              sx={{
                display: 'flex',
                gap: '50px',
                width: '295px',
                height: '51px',
                padding: '4px',
                borderRadius: '19px',
                marginTop: '50px',
                backgroundColor: Colors.secondary,
              }}
            >
              <Box
                sx={{
                  padding: '12px 46px',
                  borderRadius: '19px',
                  backgroundColor: Colors.primary,
                  color: Colors.white,
                  cursor: 'pointer',
                }}
              >
                <Typography fontSize={16}>Log in</Typography>
              </Box>
              <Typography
                fontSize={16}
                color={Colors.notActive}
                padding={'12px 0'}
              >
                <Link to='/' component={<SignUp />}>
                  Sign up
                </Link>
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box>
                <TextField
                  variant='standard'
                  label='Email'
                  color='third'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{
                    width: '300px',
                    margin: '60px 0 45px 0 ',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </Box>
              <Box>
                <TextField
                  variant='standard'
                  type={seePassword ? 'text' : 'password'}
                  label='Password'
                  color='third'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{
                    width: '300px',
                    fontFamily: 'Inter', // Set the font to Inter
                  }}
                />
                <VisibilityIcon
                  onClick={() => setSeePassword(!seePassword)}
                  sx={{
                    cursor: 'pointer',
                    color: 'gray',
                    marginBottom: '-30px',
                    marginLeft: '10px',
                  }}
                />
              </Box>
              <AuthorBtn
                type='submit'
                text='Log in'
                sx={{ marginTop: '70px', marginLeft: '75px' }}
              ></AuthorBtn>
            </form>
          </Box>
        </Box>
        {!isSmallScreen && (
          <Box>
            <img src={People} alt='' />
          </Box>
        )}
      </Box>

      {userErrors ? (
        <Box
          sx={{
            position: 'absolute',
            width: '100vw',
            top: '0',
            left: '0',
            backgroundColor: Colors.loginFalseBg,
            fontFamily: 'Rowdies, sans-serif',
            fontSize: '22px',
            color: Colors.loginFalseTxt,
            display: 'grid',
            placeItems: 'center',
            padding: '17px 83px',
          }}
        >
          Нам не вдалося знайти обліковий запис. Перевірте своє ім'я користувача
          та пароль і повторіть спробу.
        </Box>
      ) : null}
    </Box>
  );
}

export default LogIn;
