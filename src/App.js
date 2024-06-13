import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CandidateForm from "./component/CandidateForm";
import SuccessPage from "./component/SuccessPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CandidateForm />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
