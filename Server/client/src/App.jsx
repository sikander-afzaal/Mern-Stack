import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header/Header";
import Hero from "./Pages/Hero/Hero";
import About from "./Pages/About/About";
import Signin from "./Pages/Signin/Signin";
import Register from "./Pages/Register/Register";
import Contact from "./Pages/Contact/Contact";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
