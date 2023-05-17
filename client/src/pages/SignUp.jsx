import { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Colors } from '../styles';
import { Link } from 'react-router-dom';
import LogIn from './LogIn';
import Logo from '/logo.svg';
import People from '/people.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MainText from '../components/MainText';
import axios from 'axios';
import TransitionsModal from '../components/Modal';
import AuthorBtn from '../components/ButtonSubmit';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ '': '' });
  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return errors;
  };
  const validateForm = () => {
    const errors = {};
    if (firstName.trim() === '') {
      errors.name = 'Please enter your name';
    }

    if (surname.trim() === '') {
      errors.surname = 'Please enter your surname';
    }

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

    // Validate password confirmation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const signup = { firstName, surname, email, password };

      try {
        const response = await axios.post(
          'https://financial-monitor-production.up.railway.app/api/v1/registration',
          signup,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        localStorage.setItem('responseData', JSON.stringify(response.data));
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
          console.log(error.response.data.message);
        } else {
          console.log('Error:', error.message);
        }
      }
    }
  };

  return (
    <Box
      sx={{
        width: '1280px',
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
              <Typography
                fontSize={16}
                color={Colors.notActive}
                padding={'12px 0px 12px 40px'}
              >
                <Link to='/login' component={<LogIn />}>
                  Log in
                </Link>
              </Typography>

              <Box
                sx={{
                  padding: '12px 50px',
                  borderRadius: '19px',
                  backgroundColor: Colors.primary,
                  color: Colors.white,
                  cursor: 'pointer',
                }}
              >
                <Typography fontSize={16}>Sign up</Typography>
              </Box>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box>
                <TextField
                  variant='standard'
                  label='Name'
                  color='third'
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  sx={{
                    width: '300px',
                    margin: '60px 0 45px 0 ',
                  }}
                />
              </Box>
              <Box>
                <TextField
                  variant='standard'
                  label='Surname'
                  color='third'
                  type='text'
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  error={Boolean(errors.surname)}
                  helperText={errors.surname}
                  sx={{
                    width: '300px',
                  }}
                />
              </Box>
              <Box>
                <TextField
                  variant='standard'
                  label='Email'
                  color='third'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email) || Boolean(message)}
                  helperText={errors.email || message}
                  sx={{
                    width: '300px',
                    margin: '45px 0 45px 0 ',
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
                    marginBottom: '45px',
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
              <Box>
                <TextField
                  color='third'
                  label='Password confirmation'
                  variant='standard'
                  type={seePassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                  sx={{
                    width: '300px',
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
              {email &&
              password &&
              confirmPassword &&
              Object.keys(errors).length === 0 ? (
                <TransitionsModal
                  sx={{ marginTop: '70px', marginLeft: '75px' }}
                  email={email}
                  password={password}
                />
              ) : (
                <AuthorBtn
                  type='submit'
                  text='Sign Up'
                  sx={{ marginTop: '70px', marginLeft: '75px' }}
                />
              )}
            </form>
          </Box>
        </Box>
        <Box>
          <img src={People} alt='' />
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
