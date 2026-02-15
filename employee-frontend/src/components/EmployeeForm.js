import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployeeById, updateEmployee } from "../services/employeeService";

const initialForm = {
  name: "",
  email: "",
  department: "",
  salary: ""
};

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState({ type: "", text: "" });

  const getApiErrorMessage = (error, fallback) => {
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.response?.status) return `Request failed with status ${error.response.status}.`;
    if (error?.request) return "Backend is not reachable. Make sure Spring Boot is running on http://localhost:8080.";
    return fallback;
  };

  useEffect(() => {
    if (!isEdit) return;

    const fetchEmployee = async () => {
      try {
        const res = await getEmployeeById(id);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          department: res.data.department || "",
          salary: res.data.salary ?? ""
        });
      } catch (error) {
        setMessage({ type: "danger", text: getApiErrorMessage(error, "Failed to load employee details.") });
      }
    };

    fetchEmployee();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const payload = {
      ...formData,
      salary: formData.salary === "" ? null : Number(formData.salary)
    };

    try {
      if (isEdit) {
        await updateEmployee(id, payload);
        setMessage({ type: "success", text: "Employee updated successfully......" });
      } else {
        await createEmployee(payload);
        setMessage({ type: "success", text: "Employee added successfully......" });
        setFormData(initialForm);
      }

      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      setMessage({
        type: "danger",
        text: getApiErrorMessage(error, "Request failed. Please check inputs and try again.")
      });
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="mb-3">{isEdit ? "Edit Employee" : "Add Employee"}</h3>

        {message.text && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              className="form-control"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success me-2" type="submit">
            {isEdit ? "Update" : "Save"}
          </button>
          <Link className="btn btn-secondary" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
