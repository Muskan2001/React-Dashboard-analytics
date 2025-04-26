import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import { CssBaseline } from '@mui/material';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
