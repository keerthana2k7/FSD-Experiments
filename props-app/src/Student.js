function Student({regno, programme, name, mobile}) {
  return (
    <div style={{marginTop:"20px", textAlign:"center"}}>
      <h3>Submitted Data</h3>
      <p>Reg No: {regno}</p>
      <p>Programme: {programme}</p>
      <p>Name: {name}</p>
      <p>Mobile: {mobile}</p>
    </div>
  );
}

export default Student;