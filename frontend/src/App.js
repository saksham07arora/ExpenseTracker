import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import FinancialRecords from './Components/Transaction/Transaction';
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/Components/Credentials/Login';
import SignUp from '../src/Components/Credentials/Signup';


const MemoizedNavigation = React.memo(({ active, setActive }) => {
  return <Navigation active={active} setActive={setActive} />;
});

function App() {
  const [active, setActive] = useState(1);

  const { isLoggedIn } = useGlobalContext();
  console.log('Global Context:', isLoggedIn);

  const displayComponent = useMemo(() => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <FinancialRecords />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  }, [active]);

  const orbMemo = useMemo(() => <Orb />, []);

  // Check login status and render the appropriate routes
  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/user"
          element={
            <AppStyled bg={bg} className="App">
              {orbMemo}
              <MainLayout>
                <MemoizedNavigation active={active} setActive={setActive} />
                <main>{displayComponent}</main>
              </MainLayout>
            </AppStyled>
          }
        />
        <Route path="*" element={<Navigate to="/user" />} />
      </Routes>
    </BrowserRouter>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
