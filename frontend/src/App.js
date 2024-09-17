import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import FinancialRecords from './Components/Transaction/Transaction';
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Credentials/Login';
import SignUp from './Components/Credentials/Signup';
import KnowledgeBaseQuery from './Components/Chaboat/chatboat';
import { useAuth } from '../src/Components/LandingPage/useAuth'

function App() {
  const [active, setActive] = useState(1);
  const {isAuthenticated } = useAuth();

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

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route
            path="/user"
            element={
              <AppStyled bg={bg} className="App">
                {orbMemo}
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                  <main>{displayComponent}</main>
                </MainLayout>
                <KnowledgeBaseWrapper>
                  <KnowledgeBaseQuery />
                </KnowledgeBaseWrapper>
              </AppStyled>
            }
          />
        )}
        <Route path="*" element={<Navigate to={!isAuthenticated ? '/' : '/user'} />} />
      </Routes>
    </BrowserRouter>
  );
}

// Styled components for layout
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

const KnowledgeBaseWrapper = styled.div`
  position: fixed;
  bottom: 20px; /* Adjust position as needed */
  right: 20px;  /* Adjust position as needed */
  z-index: 1000; /* Ensure it's above other content */
`;

export default App;
