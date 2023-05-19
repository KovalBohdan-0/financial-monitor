import Logo from '/logo.svg';
import { Box } from '@mui/material';
import MainText from '../components/MainText';
// import MainInput from '../components/MainInput';
import Person from '/Person-Pose.svg';

import MainNavigation from '../components/MainNavigation';

function Zvit() {
  return (
    <>
      <Box m='0 auto' width='1280px' padding='43px 66px'>
        <Box display={'flex'} gap={'60px'} alignItems={'center'}>
          <Box>
            <img src={Logo} alt='Logo' />
          </Box>
          <Box display={'flex'} alignItems={'center'} gap='200px'>
            <MainText value1='Звіти' />
          </Box>
        </Box>
        <Box display={'flex'} gap={'17px'} mt='36px'>
          <Box>
            <MainNavigation value={'/zvit'} />
            <Box mt='125px'>
              <img src={Person} alt='' />
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </>
  );
}

export default Zvit;
