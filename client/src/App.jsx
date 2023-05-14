import { ThemeProvider } from '@emotion/react';
import LogIn from './pages/LogIn';
import theme from './styles';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
