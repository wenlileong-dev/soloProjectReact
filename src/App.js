import logo from "./logo.svg";
import "./App.css";
import Cookies from "universal-cookie";
import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import MySnippet from "./pages/MySnippets";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";

function App() {
  const cookies = new Cookies();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Explore cookies={cookies} />} />
        <Route path="/explore" element={<Explore cookies={cookies} />} />
        <Route path="/create" element={<Create cookies={cookies} />} />
        <Route path="/mySnippet" element={<MySnippet cookies={cookies} />} />
        <Route path="/profile" element={<Profile cookies={cookies} />} />
        <Route path="/auth" element={<Login cookies={cookies} />} />
      </Routes>
    </div>
  );
}

export default App;
