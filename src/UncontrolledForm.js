import { useRef } from "react";

function UncontrolledForm({ goBack }) {

  const regNoRef = useRef();
  const programmeRef = useRef();
  const nameRef = useRef();
  const mobileRef = useRef();
  const reasonRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      regNoRef.current.value === "" ||
      programmeRef.current.value === "" ||
      nameRef.current.value === "" ||
      mobileRef.current.value === ""
    ) {
      alert("Please fill all mandatory fields");
      return;
    }

    alert("Uncontrolled Registration Submitted Successfully");
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Exam Registration – Uncontrolled Form</h3>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input ref={regNoRef} placeholder="Registration No *" />

        <select ref={programmeRef}>
          <option value="">Select Programme *</option>
          <option value="BE">BE</option>
          <option value="BTech">B.Tech</option>
        </select>

        <input ref={nameRef} placeholder="Student Name *" />

        <input type="date" placeholder="Date of Birth" />

        <input placeholder="Father's / Guardian's Name" />

        <textarea placeholder="Address" />

        <input ref={mobileRef} placeholder="Mobile Number *" />

        <input placeholder="Email" />

        <input placeholder="Class studying / passed" />

        <input placeholder="Last exam percentage" />

        <textarea placeholder="School name & address" />

        <textarea
          ref={reasonRef}
          placeholder="Reason for choosing the programme"
        />

        <textarea placeholder="Academic strengths and weaknesses" />

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


export default UncontrolledForm;
