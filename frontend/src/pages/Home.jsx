import {useState, useEffect} from 'react';
import api from '../api/axios';
import {Link} from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const response = await api.get(
      `/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`
    );
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:max-w-2xl rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full lg:w-64 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-60 w-full object-cover transition duration-200 hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">${product.price}</span>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Buy now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 