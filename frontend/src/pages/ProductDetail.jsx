import {useState, useEffect} from 'react';
import api from '../api/axios';
import {useParams} from 'react-router-dom';

export default function ProductDetail() {
  const {id} = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const response = await api.get(`/products/${id}`);
    setProduct(response.data.product || response.data);
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="h-96 w-full object-cover mb-4 rounded" />
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="mt-4">{product.description}</p>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
        Add to Cart
      </button>
    </div>
  );
}