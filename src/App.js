import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelfConfidenceTest from './SelfConfidenceTest';
import LeadershipQualityTest from './LeadershipQualityTest';
import EmotionalIntelligenceTest from './EmotionalIntelligenceTest';
import Results from './Results';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelfConfidenceTest />} />
        <Route path="/leadership-test" element={<LeadershipQualityTest />} />
        <Route path="/emotional-intelligence-test" element={<EmotionalIntelligenceTest />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
