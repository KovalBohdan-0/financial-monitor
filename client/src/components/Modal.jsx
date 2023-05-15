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

export default function TransitionsModal(props) {
  const [sendEmail, setSendEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
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

            {sendEmail ? (
              <Box textAlign='center' mt='58px'>
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
                <img
                  onClick={handleClose}
                  src={ConfirmIcon}
                  alt='ConfirmIcon'
                  style={{ marginTop: '50px', cursor: 'pointer' }}
                />
              </Box>
            ) : (
              <Box textAlign='center' mt='58px'>
                <Typography
                  fontSize='28px'
                  fontFamily={'Rowdies, sans-serif'}
                  fontWeight={700}
                >
                  Підтвердьте електронну адресу
                </Typography>
                <Typography
                  mt='15px'
                  fontSize='18px'
                  fontFamily={'Rowdies, sans-serif'}
                >
                  Підтвердіть пошту, щоб завершити створення профілю
                </Typography>
                <Button
                  onClick={() => setSendEmail(true)}
                  type='submit'
                  variant='contained'
                  sx={{
                    fontFamily: 'Rowdies, sans-serif',
                    padding: '27px 49px',
                    fontSize: '20px',
                    marginTop: '71px',
                    borderRadius: '50px',
                    textTransform: 'uppercase',
                  }}
                >
                  підтвердити електронну адресу
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
