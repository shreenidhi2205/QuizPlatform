import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";

const AdminPanel = () => {
  const [studentResults, setStudentResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsCollection = collection(db, "testResults");
        const resultsSnapshot = await getDocs(resultsCollection);

        if (resultsSnapshot.empty) {
          console.log("No results found in Firestore");
        }

        const resultsData = resultsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Mapped Data:", resultsData);
        setStudentResults(resultsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResults();
  }, [db]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (studentResults.length === 0) {
        alert("No records available to download.");
        setLoading(false);
        return;
      }

      const reorderedData = studentResults.map((student) => ({
        Name: student.name,
        City: student.city,
        Standard: student.standard,
        College: student.collegeName,
        "WhatsApp Number": student.whatsappNumber,
        "Self-Actualization Score": student.selfConfidenceScore,
        "Leadership Quality Score": student.leadershipQualityScore,
        "Emotional Intelligence Score": student.emotionalIntelligenceScore,
      }));

      const worksheet = XLSX.utils.json_to_sheet(reorderedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Student Results");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "student_results.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error("Error downloading records:", error);
      alert("Failed to download records.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      maxWidth: "1200px",
      margin: "20px auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
      }}>Admin Panel - Student Results</h2>

      <button
        onClick={handleDownload}
        disabled={loading}
        style={{
          display: "block",
          margin: "0 auto 20px auto",
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
      >
        {loading ? "Downloading..." : "Download Excel"}
      </button>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
        <thead>
          <tr style={{
            backgroundColor: "#6e91ff",  
            color: "white",
            textAlign: "left",
          }}>
            <th style={{ padding: "10px", borderRight: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", borderRight: "1px solid #ddd" }}>City</th>
            <th style={{ padding: "10px", borderRight: "1px solid #ddd" }}>College</th>
            <th style={{ padding: "10px", borderRight: "1px solid #ddd" }}>WhatsApp Number</th>
            <th style={{ padding: "10px", borderRight: "1px solid #ddd" }}>Standard</th>
            <th style={{ padding: "10px", borderRight: "1px solid #ddd" }}>Self-Actualization Score</th>
            <th style={{ padding: "10px", borderRight: "1px solid #ddd" }}>Leadership Quality Score</th>
            <th style={{ padding: "10px" }}>Emotional Intelligence Score</th>
          </tr>
        </thead>
        <tbody>
          {studentResults.length > 0 ? (
            studentResults.map((testResults) => (
              <tr key={testResults.id} style={{
                borderBottom: "1px solid #ddd",
              }}>
                <td style={{ padding: "10px", borderRight: "1px solid #ddd" }}>{testResults.name}</td>
                <td style={{ padding: "10px", borderRight: "1px solid #ddd" }}>{testResults.city}</td>
                <td style={{ padding: "10px", borderRight: "1px solid #ddd" }}>{testResults.collegeName}</td>
                <td style={{ padding: "10px", borderRight: "1px solid #ddd" }}>{testResults.whatsappNumber}</td>
                <td style={{ padding: "10px", borderRight: "1px solid #ddd" }}>{testResults.standard}</td>
                <td style={{ padding: "10px", borderRight: "1px solid #ddd" }}>{testResults.selfConfidenceScore}</td>
                <td style={{ padding: "10px", borderRight: "1px solid #ddd" }}>{testResults.leadershipQualityScore}</td>
                <td style={{ padding: "10px" }}>{testResults.emotionalIntelligenceScore}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{
                textAlign: "center",
                padding: "20px",
                color: "#666",
              }}>No results available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
