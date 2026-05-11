import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      setMsg({ type: "success", text: "✓ Login successful!" });
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      let suggestion = "";
      
      if (errorMessage.includes("Invalid credentials")) {
        suggestion = "Check your email and password, then try again.";
      } else if (errorMessage.includes("Server error")) {
        suggestion = "Please try again later.";
      }
      
      setMsg({ type: "error", text: errorMessage, suggestion });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        {msg && (
          <div className={`mb-4 p-3 rounded-md ${msg.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <p className={msg.type === "success" ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
              {msg.text}
            </p>
            {msg.suggestion && (
              <p className={`text-sm mt-2 ${msg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                💡 {msg.suggestion}
              </p>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
