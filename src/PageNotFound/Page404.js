import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Page404() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>404 🍕</h1>
        <h2 style={styles.heading}>Oops! Page Not Found</h2>
        <p style={styles.message}>
          The page <code style={styles.codeHighlight}>{location.pathname}</code>{" "}
          doesn’t exist on our menu.
        </p>
        <button style={styles.button} onClick={() => navigate("/home")}>
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2.5rem",
    borderRadius: "1.25rem",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  code: {
    fontSize: "5rem",
    fontWeight: "bold",
    color: "#ff6f61",
  },
  heading: {
    fontSize: "1.75rem",
    margin: "0.5rem 0",
    color: "#333",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    color: "#666",
  },
  codeHighlight: {
    backgroundColor: "#ffe9e6",
    padding: "0.2rem 0.4rem",
    borderRadius: "0.4rem",
    fontFamily: "monospace",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ff6f61",
    color: "#fff",
    border: "none",
    borderRadius: "0.6rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
};

export { Page404 };
