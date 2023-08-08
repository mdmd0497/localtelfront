import React from "react";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import { About } from "./components/About";
import { Navbar } from "./components/Navbar";
import { Users } from "./components/Users";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container p-4">
        <Routes>
          <Route path="/about" Component={About}/>
          <Route path="/" Component={Users}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
