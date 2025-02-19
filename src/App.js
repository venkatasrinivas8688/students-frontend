import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Read from "./components/Read";
import Edit from "./components/Edit";
import Create from "./components/Create";

function App() {
  return (
    <Routes>
      <Route path="/create" element={<Create />} />
      <Route path="/" element={<Home />} />
      <Route path="/read/:id" element={<Read />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;
