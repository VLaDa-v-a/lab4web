import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/actions';
import { BelleProvider } from './components/Belle';
import StartPage from './pages/StartPage';
import MainPage from './pages/MainPage';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BelleProvider>
      <BrowserRouter basename="/lab4">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </BelleProvider>
  );
};

export default App;

