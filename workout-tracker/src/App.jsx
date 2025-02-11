import React from "react"
import Navbar from "./components/Navbar/Navbar"
// import LoginPage from "./components/LoginPage"
import Homepage from "./components/Homepage/Homepage"
import Plan from "./pages/Plan"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./components/LoginPage/LoginPage"
import ExercisePage from "./components/ExercisePage/ExercisePage"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/exercises" element={<ExercisePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
