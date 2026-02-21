import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const roles = [
  {
    id: "fleet_manager",
    title: "Fleet Manager",
    description: "Manage vehicles, drivers and operations.",
  },
  {
    id: "Dispatcher",
    title: "Dispatcher",
    description: "Assign trips and manage schedules.",
  },
  {
    id: "safety_officer",
    title: "Safety Officer",
    description: "Ensure compliance and safety standards.",
  },
  {
    id: "adfinance_analystmin",
    title: "Finance / Analyst",
    description: "Handle reports, billing and analytics.",
  },
];

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      };

      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text(); // avoid res.json() if response is HTML
        throw new Error(text || res.statusText);
      }

      const data = await res.json();
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-700">Create Account in Fleet Management</h2>
          <p className="text-gray-500 mt-2">Select your role and register to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`cursor-pointer p-5 rounded-xl transition-all duration-300 ${
                selectedRole === role.id ? "bg-purple-100 ring-2 ring-purple-400 shadow-md" : "bg-white hover:bg-purple-50 shadow-sm"
              }`}
            >
              <h3 className="text-lg font-semibold text-purple-700">{role.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{role.description}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input type="text" name="name" required onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-100 focus:bg-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <input type="email" name="email" required onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-100 focus:bg-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" />
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input type="password" name="password" required onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-100 focus:bg-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={!selectedRole || loading} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            I have an account?{" "}
            <NavLink to="/" className="text-purple-600 font-medium cursor-pointer hover:underline">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;