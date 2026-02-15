import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8080/api/employees";

export const getEmployees = () => axios.get(API_BASE);
export const getEmployeeById = (id) => axios.get(`${API_BASE}/${id}`);
export const createEmployee = (employee) => axios.post(API_BASE, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_BASE}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_BASE}/${id}`);
