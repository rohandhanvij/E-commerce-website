import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/add", form);
      setMsg("Product added successfully");
      setTimeout(() => {
        navigate("/admin/products");
      }, 800);
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        {msg && <p className="text-center text-sm text-green-600 mb-4">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
