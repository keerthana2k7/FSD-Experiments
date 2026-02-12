import { useState } from "react";
import ControlledForm from "./ControlledForm";
import UncontrolledForm from "./UncontrolledForm";

function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div style={styles.page}>

      {page === "dashboard" && (
        <div style={styles.card}>

          <h2 style={styles.title}>
            🎓 Student Registration Portal
          </h2>

          <p style={styles.subtitle}>
            Select the type of registration form
          </p>

          <button
            style={styles.primaryBtn}
            onClick={() => setPage("controlled")}
          >
            Controlled Form (Exam Registration)
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => setPage("uncontrolled")}
          >
            Uncontrolled Form (Exam Registration)
          </button>

        </div>
      )}

      {page === "controlled" && (
        <ControlledForm goBack={() => setPage("dashboard")} />
      )}

      {page === "uncontrolled" && (
        <UncontrolledForm goBack={() => setPage("dashboard")} />
      )}

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f4f7fb, #e9eef5)"
  },

  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)"
  },

  title: {
    marginBottom: "8px",
    color: "#1f3a5f"
  },

  subtitle: {
    marginBottom: "25px",
    color: "#6b7a90",
    fontSize: "14px"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#1f3a5f",
    color: "#ffffff",
    fontSize: "15px",
    cursor: "pointer"
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    border: "1px solid #1f3a5f",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#1f3a5f",
    fontSize: "15px",
    cursor: "pointer"
  }
};



export default App;
