import Logo from '/logo.svg';
import { Box } from '@mui/material';
import MainText from '../components/MainText';
// import MainInput from '../components/MainInput';
import Person from '/Person-Pose.svg';

import MainNavigation from '../components/MainNavigation';
import MyCardText from '../components/MyCardText';
import Diagram from '../components/Diagram';
import AnalitycsBtn from '../components/AnalyticsBtn';
import CardInfo from '../components/CardInfo';
function Main() {
  // const [search, setSearch] = useState('');

  return (
    <>
      <Box m='0 auto' width='1280px' padding='43px 66px'>
        <Box display={'flex'} gap={'60px'} alignItems={'center'}>
          <Box>
            <img src={Logo} alt='Logo' />
          </Box>
          <Box display={'flex'} alignItems={'center'} gap='200px'>
            <MainText value1='Головна' />
            {/* <Box>
              <MainInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Знайти...'
              />
            </Box> */}
          </Box>
        </Box>
        <Box display={'flex'} gap={'17px'} mt='36px'>
          <Box>
            <MainNavigation />
            <Box mt='125px'>
              <img src={Person} alt='' />
            </Box>
          </Box>
          <Box>
            <MyCardText text='Моя карта' />
            <CardInfo sx={{ margin: '40px 0' }} />
            <MyCardText text='Аналітика' />
            <AnalitycsBtn />
            <Diagram />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Main;
