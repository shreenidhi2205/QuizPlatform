import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SelfConfidenceTest from './SelfConfidenceTest';
import LeadershipQualityTest from './LeadershipQualityTest';
import EmotionalIntelligenceTest from './EmotionalIntelligenceTest';
import Results from './1Results';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <div style={{ position: 'absolute', top: 10, right: 20 }}>
        {!isLoggedIn ? (
          <Link to="/login">
            <button>Login</button>
          </Link>
        ) : (
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        )}
      </div>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<SelfConfidenceTest />} />
            <Route path="/leadership-test" element={<LeadershipQualityTest />} />
            <Route path="/emotional-intelligence-test" element={<EmotionalIntelligenceTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </>
        ) : (
          <Route path="/" element={<AdminPanel />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
