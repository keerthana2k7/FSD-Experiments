import { useState, useEffect, createContext, useContext } from "react";
import "./App.css";

const SettingsContext = createContext();

function Dashboard() {
  const { theme, setTheme, username } = useContext(SettingsContext);

  const [time, setTime] = useState(new Date());
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`dashboard ${theme}`}>
      
      {/* HEADER */}
      <div className="header">
        <h1>📊 Dashboard</h1>
        <button className="theme-btn" onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }>
          🌙 Toggle
        </button>
      </div>

      {/* WELCOME */}
      <div className="welcome-card">
        <h2>Welcome back, {username} 👋</h2>
        <p>Here’s your live dashboard overview</p>
      </div>

      {/* CARDS */}
      <div className="grid">
        <div className="card">
          <h3>⏰ Time</h3>
          <p>{time.toLocaleTimeString()}</p>
        </div>

        <div className="card">
          <h3>🔄 Updates</h3>
          <p>{count}</p>
        </div>

        <div className="card">
          <h3>📈 Status</h3>
          <p>Active</p>
        </div>

        <div className="card">
          <h3>📦 Tasks</h3>
          <p>5 Pending</p>
        </div>
      </div>

    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const [username] = useState("Keerthana");

  return (
    <SettingsContext.Provider value={{ theme, setTheme, username }}>
      <Dashboard />
    </SettingsContext.Provider>
  );
}

export default App;