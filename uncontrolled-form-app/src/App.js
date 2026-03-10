import { useRef } from "react";

function App() {
  const regNoRef = useRef();
  const programmeRef = useRef();
  const nameRef = useRef();
  const mobileRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const regNo = regNoRef.current.value.trim();
    const programme = programmeRef.current.value;
    const name = nameRef.current.value.trim();
    const mobile = mobileRef.current.value.trim();

    if (!regNo || !programme || !name || !mobile) {
      alert("All fields are mandatory");
      return;
    }

    if (regNo.length !== 7) {
      alert("Registration Number must be exactly 7 characters (Eg: 22CS101)");
      return;
    }

    const regPattern = /^[0-9]{2}[A-Za-z]{2}[0-9]{3}$/;
    if (!regPattern.test(regNo)) {
      alert("Invalid Registration Number format");
      return;
    }

    if (name.length < 3 || name.length > 30) {
      alert("Name must be between 3 and 30 characters");
      return;
    }

    const namePattern = /^[A-Za-z ]+$/;
    if (!namePattern.test(name)) {
      alert("Name should contain only alphabets");
      return;
    }

    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (isNaN(mobile)) {
      alert("Mobile number must contain only digits");
      return;
    }

    alert("Form Submitted Successfully ✅");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>
          Exam Registration – Uncontrolled Form
        </h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            ref={regNoRef}
            placeholder="Registration No *"
            maxLength={7}
          />

          <select
            style={styles.input}
            ref={programmeRef}
          >
            <option value="">Select Programme *</option>
            <option value="BE">BE</option>
            <option value="BTech">B.Tech</option>
          </select>

          <input
            style={styles.input}
            ref={nameRef}
            placeholder="Student Name *"
            minLength={3}
            maxLength={30}
          />

          <input
            style={styles.input}
            ref={mobileRef}
            placeholder="Mobile Number *"
            minLength={10}
            maxLength={10}
          />

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