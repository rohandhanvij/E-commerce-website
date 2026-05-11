import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const initialForm = {
  title: "",
  description: "",
  price: "",
  category: "",
  image: "",
  stock: "",
};

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const allowedFields = ["title", "description", "price", "category", "image", "stock"];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setForm(res.data.product ?? res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/update/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to update product");
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading product...</div>;
  }

  return (
    <div className="container mx-auto mt-10 max-w-xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      {error && <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">{error}</div>}
      {message && <div className="mb-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-yellow-900">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {allowedFields.map((field) => (
          <div key={field}>
            <label className="mb-1 block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              name={field}
              type={field === "price" || field === "stock" ? "number" : "text"}
              value={form[field] ?? ""}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
