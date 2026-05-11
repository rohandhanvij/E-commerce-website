import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully");
      loadProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Product List</h2>
                <Link to="/admin/add-product" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Add Product
                </Link>
            </div>
        

        <table className="min-w-full bg-white border">
            <thead>
                <tr className="w-full bg-gray-200 text-left">
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Category</th>
                    <th className="py-2 px-4 border-b">Stock</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id} className="border-b">
                    <td className="py-2 px-4">{product.title}</td>
                    <td className="py-2 px-4">${product.price}</td>
                    <td className="py-2 px-4">{product.category}</td>
                    <td className="py-2 px-4">{product.stock}</td>
                    <td className="py-2 px-4">
                        <Link
                            to={`/admin/products/${product._id}/edit`}
                            className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition duration-200 mr-2"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => deleteProduct(product._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
         </div>
    ); 
}