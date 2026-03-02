import { useState } from "react";

function ControlledForm({ goBack }) {
  const [form, setForm] = useState({
    regNo: "",
    testDate: "",
    programme: "",
    name: "",
    dob: "",
    father: "",
    address: "",
    mobile: "",
    email: "",
    classStudying: "",
    percentage: "",
    school: "",
    reason: "",
    strengths: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.regNo || !form.name || !form.programme || !form.mobile) {
      setError("Please fill all mandatory fields");
      return;
    }

    setError("");
    alert("Controlled Registration Submitted Successfully");
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Exam Registration – Controlled Form</h3>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          name="regNo"
          placeholder="Registration No *"
          value={form.regNo}
          onChange={handleChange}
        />

        <input
          type="date"
          name="testDate"
          value={form.testDate}
          onChange={handleChange}
        />

        <select
          name="programme"
          value={form.programme}
          onChange={handleChange}
        >
          <option value="">Select Programme *</option>
          <option value="BE">BE</option>
          <option value="BTech">B.Tech</option>
        </select>

        <input
          name="name"
          placeholder="Student Name *"
          value={form.name}
          onChange={handleChange}
        />

        {/* Live Preview (shows controlled nature clearly) */}
        <p style={{ fontSize: "12px", color: "#1f3a5f" }}>
          Live Name Preview: {form.name}
        </p>

        <input
          name="mobile"
          placeholder="Mobile Number *"
          value={form.mobile}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ textAlign: "center" }}>
          <button style={styles.primaryBtn}>Submit</button>
          <button type="button" onClick={goBack} style={styles.backBtn}>
            Back
          </button>
        </div>

      </form>
    </div>
  );
}

const styles = {
  card: {
    width: "520px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)"
  },
  title: {
    textAlign: "center",
    color: "#1f3a5f",
    marginBottom: "10px"
  },
  form: {
    display: "grid",
    gap: "10px"
  },
  primaryBtn: {
    padding: "10px 22px",
    background: "#1f3a5f",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer"
  },
  backBtn: {
    padding: "10px 22px",
    borderRadius: "5px",
    border: "1px solid #1f3a5f",
    background: "#ffffff",
    color: "#1f3a5f",
    cursor: "pointer"
  }
};

export default ControlledForm;