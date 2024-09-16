// src/App.js
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useAuth } from '../src/context/authContext' // Import the useAuth hook
import FinancialRecords from './Components/Transaction/Transaction';
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/Components/Credentials/Login';
import SignUp from '../src/Components/Credentials/Signup';
import KnowledgeBaseQuery from './Components/Chaboat/chatboat';

// Memoized Navigation component
const MemoizedNavigation = React.memo(({ active, setActive }) => {
  return <Navigation active={active} setActive={setActive} />;
});

function App() {
  const [active, setActive] = useState(1);
  const { isLoggingIn } = useAuth(); // Get the isLoggingIn value from the context

  // Determine which component to display based on active state
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
        {/* If the user is logging in, show the login/signup pages */}
        {!isLoggingIn ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          // If logged in, show the user dashboard and other protected routes
          <Route
            path="/user"
            element={
              <AppStyled bg={bg} className="App">
                {orbMemo}
                <MainLayout>
                  <MemoizedNavigation active={active} setActive={setActive} />
                  <main>{displayComponent}</main>
                </MainLayout>
                <KnowledgeBaseWrapper>
                  <KnowledgeBaseQuery />
                </KnowledgeBaseWrapper>
              </AppStyled>
            }
          />
        )}
        <Route path="*" element={<Navigate to={isLoggingIn ? '/user' : '/'} />} />
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
