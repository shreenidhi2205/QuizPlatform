import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SelfConfidenceTest from "./SelfConfidenceTest";
import LeadershipQualityTest from "./LeadershipQualityTest";
import EmotionalIntelligenceTest from "./EmotionalIntelligenceTest";
import Results from "./1Results";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <div>
        {/* Hamburger Menu */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            cursor: "pointer",
            zIndex: 1000,
          }}
          onClick={() => setIsSidePanelOpen(true)}
        >
          <div style={{ width: "25px", height: "3px", backgroundColor: "#333", margin: "5px 0" }}></div>
          <div style={{ width: "25px", height: "3px", backgroundColor: "#333", margin: "5px 0" }}></div>
          <div style={{ width: "25px", height: "3px", backgroundColor: "#333", margin: "5px 0" }}></div>
        </div>

        {/* Side Panel */}
        {isSidePanelOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "250px",
              height: "100vh",
              backgroundColor: "#f4f4f4",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              padding: "20px",
              zIndex: 999,
            }}
          >
            <button
              onClick={() => setIsSidePanelOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              ×
            </button>
            {!isLoggedIn ? (
              <Link to="/login" onClick={() => setIsSidePanelOpen(false)} style={{ textDecoration: "none" }}>
                <p style={{ color: "#333", cursor: "pointer", margin: "10px 0" }}>Admin Login</p>
              </Link>
            ) : (
              <p
                style={{ color: "#333", cursor: "pointer", margin: "10px 0" }}
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsSidePanelOpen(false);
                }}
              >
                Logout
              </p>
            )}
          </div>
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
