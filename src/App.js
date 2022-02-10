import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import MySnippet from "./pages/MySnippets";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
        <Route path="/mySnippet" element={<MySnippet />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
