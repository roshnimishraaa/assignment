import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideNavBar/SideNavBar.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />}/>
      </Routes>
    </Router>
  );
};

export default App;
