function Student({ name, department, year }) {
  return (
    <div style={styles.card}>
      <h3>Student Details</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    marginTop: "20px"
  }
};

export default Student;