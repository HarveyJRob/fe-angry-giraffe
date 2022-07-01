// Stylesheets
import "./App.css";

// React Imports
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
