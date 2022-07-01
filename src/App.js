// Stylesheets
import "./App.css";

// React Imports
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/fe-angry-giraffe" element={<Home />} />
          <Route path="/fe-angry-giraffe/about" element={<About />} />
          <Route path="/fe-angry-giraffe/portfolio" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
