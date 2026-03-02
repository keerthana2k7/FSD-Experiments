import Student from "./Student";

function App() {
  return (
    <div style={styles.container}>
      <h2> Student Information</h2>

      <Student 
        name="Keerthana"
        department="Computer Science"
        year="3rd Year"
      />

      <Student 
        name="Rahul"
        department="Information Technology"
        year="2nd Year"
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif"
  }
};

export default App;