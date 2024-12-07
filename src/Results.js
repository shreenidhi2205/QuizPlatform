import React, { useEffect, useState } from 'react';
import Header from './components/Header';

const Results = () => {
  const [selfConfidenceScore, setSelfConfidenceScore] = useState(0);
  const [leadershipQualityScore, setLeadershipQualityScore] = useState(0);
  const [emotionalIntelligenceScore, setEmotionalIntelligenceScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    standard: '',
    whatsappNumber: '',
    city: '',
  });

  useEffect(() => {
    const calculateScore = (responses) => {
      return Object.values(responses).reduce((sum, value) => sum + Number(value), 0);
    };

    const selfConfidenceResponses = JSON.parse(localStorage.getItem('selfConfidenceScore') || '{}');
    const leadershipQualityResponses = JSON.parse(localStorage.getItem('leadershipQualityScore') || '{}');
    const emotionalIntelligenceResponses = JSON.parse(localStorage.getItem('emotionalIntelligenceScore') || '{}');

    setSelfConfidenceScore(calculateScore(selfConfidenceResponses));
    setLeadershipQualityScore(calculateScore(leadershipQualityResponses));
    setEmotionalIntelligenceScore(calculateScore(emotionalIntelligenceResponses));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'whatsappNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prevData => ({
        ...prevData,
        [name]: numericValue
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.whatsappNumber.length === 10) {
      setShowResults(true);
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
    } else {
      alert('Please enter a valid 10-digit WhatsApp number.');
    }
  };

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f0f8ff',
      color: '#333',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      color: '#3498db',
      fontSize: '2.5rem',
      marginBottom: '10px',
    },
    description: {
      fontSize: '1rem',
      color: '#34495e',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: '600',
      color: '#2c3e50',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #bdc3c7',
      fontSize: '1rem',
      backgroundColor: '#ffffff',
      color: '#2c3e50',
    },
    submitButton: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#e8f4fd',
      color: '#2c3e50',
      padding: '12px',
      textAlign: 'left',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e8f4fd',
    },
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Your Test Results</h1>
          {!showResults && (
            <p style={styles.description}>
              To view your results, please fill in the information below.
            </p>
          )}
        </div>
        {!showResults ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="collegeName" style={styles.label}>College Name</label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="standard" style={styles.label}>Standard</label>
              <input
                type="text"
                id="standard"
                name="standard"
                value={formData.standard}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="whatsappNumber" style={styles.label}>WhatsApp Number (10 digits)</label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="city" style={styles.label}>City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        ) : (
          <>
            <p style={styles.description}>
              Here are your scores for the three tests you've completed. These results provide insights into your self-confidence, leadership qualities, and emotional intelligence.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Test</th>
                  <th style={styles.th}>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Self-Confidence Test</td>
                  <td style={styles.td}>{selfConfidenceScore}</td>
                </tr>
                <tr>
                  <td style={styles.td}>Leadership Quality Test</td>
                  <td style={styles.td}>{leadershipQualityScore}</td>
                </tr>
                <tr>
                  <td style={styles.td}>Emotional Intelligence Test</td>
                  <td style={styles.td}>{emotionalIntelligenceScore}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Results;

