import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthorBtn from './ButtonSubmit';
import { Colors } from '../styles';
import PersonModal from '/Person-Modal.svg';
import ConfirmIcon from '/confirmation.svg';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from "../enviroment.jsx";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: Colors.modalBackground,
  borderRadius: '50px',
  boxShadow: 24,
  width: '765px',
  height: '635px',
};
TransitionsModal.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default function TransitionsModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleOpen();
  };

  return (
    <Box {...props}>
      <AuthorBtn type='submit' text='Sign Up' onClick={handleSubmit} />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                backgroundColor: Colors.primary,
                width: '765px',
                height: '279px',
                borderRadius: '50px 50px 0 0 ',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={PersonModal} alt='PersonModal' />
            </Box>

            <Box textAlign='center' mt='10px'>
              <Typography
                fontSize='28px'
                fontFamily={'Rowdies, sans-serif'}
                fontWeight={700}
              >
                Лист із підтвердженням надіслано!
              </Typography>
              <Typography
                mt='15px'
                fontSize='18px'
                fontFamily={'Rowdies, sans-serif'}
              >
                Перевірте папку вхідних повідомлень і дотримуйтеся інструкцій
              </Typography>
              <Box mt='20px'>
                <img src={ConfirmIcon} alt='ConfirmIcon' />
              </Box>
              <Button
                onClick={async () => {
                  const signup = {
                    email: props.email,
                    password: props.password,
                  };

                  try {
                    const response = await axios.post(
                      `${api}/registration/send-email-again`,
                      signup,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      }
                    );
                    console.log(response.status);
                  } catch (error) {
                    if (error.response) {
                      console.log(error.response.data.message);
                    } else {
                      console.log('Error:', error.message);
                    }
                  }
                }}
                type='submit'
                variant='contained'
                sx={{
                  fontFamily: 'Rowdies, sans-serif',
                  padding: '17px 29px',
                  fontSize: '20px',
                  marginTop: '20px',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                }}
              >
                Відправити лист повторно
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
