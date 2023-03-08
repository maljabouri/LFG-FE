import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <button>Profile</button>
          <button>Matches</button>
          <button>Messages</button>
        </ul>
      </nav>
      <h1>LFG</h1>
      <h2>Looking for Gamers</h2>
      <LandingPage />
    </div>
  );
}

export default App;
