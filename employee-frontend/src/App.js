import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">
          Employee CRUD
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Employees
          </Link>
          <Link className="nav-link" to="/employees/new">
            Add Employee
          </Link>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;