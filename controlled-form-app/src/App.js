import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    regNo: "",
    programme: "",
    name: "",
    mobile: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.regNo || !form.programme || !form.name || !form.mobile) {
      setError("Please fill all mandatory fields");
      return;
    }

    setError("");
    alert("Controlled Registration Submitted Successfully");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>
          Exam Registration – Controlled Form
        </h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="regNo"
            placeholder="Registration No *"
            value={form.regNo}
            onChange={handleChange}
          />

          <select
            style={styles.input}
            name="programme"
            value={form.programme}
            onChange={handleChange}
          >
            <option value="">Select Programme *</option>
            <option value="BE">BE</option>
            <option value="BTech">B.Tech</option>
          </select>

          <input
            style={styles.input}
            name="name"
            placeholder="Student Name *"
            value={form.name}
            onChange={handleChange}
          />

          <p style={styles.preview}>
            Live Preview: {form.name || "-"}
          </p>

          <input
            style={styles.input}
            name="mobile"
            placeholder="Mobile Number *"
            value={form.mobile}
            onChange={handleChange}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
    fontFamily: "Segoe UI, sans-serif"
  },

  card: {
    width: "420px",
    padding: "35px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "600",
    color: "#1f3a5f"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #dcdcdc",
    fontSize: "14px",
    outline: "none"
  },

  preview: {
    fontSize: "12px",
    color: "#666"
  },

  error: {
    color: "#d32f2f",
    background: "#fdecea",
    padding: "6px",
    borderRadius: "6px",
    fontSize: "12px",
    textAlign: "center"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#1f3a5f",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default App;