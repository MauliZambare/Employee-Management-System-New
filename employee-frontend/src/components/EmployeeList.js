import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../services/employeeService";

const getApiErrorMessage = (error, fallback) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.status) return `Request failed with status ${error.response.status}.`;
  if (error?.request) return "Backend is not reachable. Make sure Spring Boot is running on http://localhost:8080.";
  return fallback;
};

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      setMessage({ type: "danger", text: getApiErrorMessage(error, "Failed to fetch employees.") });
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this employee?");
    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      setMessage({ type: "success", text: "Employee deleted successfully." });
      fetchEmployees();
    } catch (error) {
      setMessage({ type: "danger", text: getApiErrorMessage(error, "Failed to delete employee.") });
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="mb-3">Employees</h3>

        {message.text && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <Link to={`/employees/edit/${emp.id}`} className="btn btn-sm btn-primary me-2">
                        Edit
                      </Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
