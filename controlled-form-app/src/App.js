import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    regNo: "",
    programme: "",
    name: "",
    mobile: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.regNo) {
      newErrors.regNo = "Registration number is required";
    } else if (form.regNo.length !== 7) {
      newErrors.regNo = "Must be exactly 7 characters (Eg: 22CS101)";
    } else if (!/^[0-9]{2}[A-Za-z]{2}[0-9]{3}$/.test(form.regNo)) {
      newErrors.regNo = "Invalid format (Eg: 22CS101)";
    }

    if (!form.programme) {
      newErrors.programme = "Please select a programme";
    }

    if (!form.name) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3 || form.name.length > 30) {
      newErrors.name = "Name must be between 3 and 30 characters";
    } else if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name = "Name should contain only letters";
    }

    if (!form.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile must be exactly 10 digits";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    alert("Controlled Registration Submitted Successfully ");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>
          Exam Registration – Controlled Form
        </h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <input
            style={{
              ...styles.input,
              border: errors.regNo ? "1px solid red" : "1px solid #dcdcdc"
            }}
            name="regNo"
            placeholder="Registration No *"
            value={form.regNo}
            onChange={handleChange}
            maxLength={7}
          />
          {errors.regNo && <p style={styles.fieldError}>{errors.regNo}</p>}

          <select
            style={{
              ...styles.input,
              border: errors.programme ? "1px solid red" : "1px solid #dcdcdc"
            }}
            name="programme"
            value={form.programme}
            onChange={handleChange}
          >
            <option value="">Select Programme *</option>
            <option value="BE">BE</option>
            <option value="BTech">B.Tech</option>
          </select>
          {errors.programme && <p style={styles.fieldError}>{errors.programme}</p>}

          <input
            style={{
              ...styles.input,
              border: errors.name ? "1px solid red" : "1px solid #dcdcdc"
            }}
            name="name"
            placeholder="Student Name *"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p style={styles.fieldError}>{errors.name}</p>}

          <p style={styles.preview}>
            Live Preview: {form.name || "-"}
          </p>

          <input
            style={{
              ...styles.input,
              border: errors.mobile ? "1px solid red" : "1px solid #dcdcdc"
            }}
            name="mobile"
            placeholder="Mobile Number *"
            value={form.mobile}
            onChange={handleChange}
            maxLength={10}
          />
          {errors.mobile && <p style={styles.fieldError}>{errors.mobile}</p>}

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
    gap: "8px"
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

  fieldError: {
    color: "red",
    fontSize: "12px",
    marginBottom: "5px"
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