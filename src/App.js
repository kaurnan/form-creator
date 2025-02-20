import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import FormBuilder from "./pages/FormBuilder"
import FormView from "./pages/FormView"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form-builder/:formType" element={<FormBuilder />} />
        <Route path="/form/:formId" element={<FormView />} />
      </Routes>
    </BrowserRouter>
  )
}

