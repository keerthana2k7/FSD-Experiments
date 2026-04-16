import { useState } from "react";
import Student from "./Student";
import "./App.css";

function App() {

  const [student, setStudent] = useState({
    regno: "",
    programme: "",
    name: "",
    mobile: ""
  });

  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(student);
  };

  return (
    <div className="container">

      <div className="form-card">
        <h2>Exam Registration</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="regno"
            placeholder="Registration No *"
            value={student.regno}
            onChange={handleChange}
            required
          />

          <select
            name="programme"
            value={student.programme}
            onChange={handleChange}
            required
          >
            <option value="">Select Programme *</option>
            <option>B.Sc Computer Science</option>
            <option>BCA</option>
            <option>B.Sc IT</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Student Name *"
            value={student.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number *"
            value={student.mobile}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>

        </form>
      </div>

      {submitted && <Student {...submitted} />}

    </div>
  );
}

export default App;