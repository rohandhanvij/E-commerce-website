import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './admin/EditProduct';
import AddProduct from './admin/AddProduct';
import ProductList from './admin/ProductList';

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/login', element: <Login />},
  {path: '/signup', element: <Signup />},
  {path: '/product/:id', element: <ProductDetail />},
  {path: '/admin/products', element: <ProductList />},
  {path: '/admin/add-product', element: <AddProduct />},
  {path: '/admin/products/:id/edit', element: <EditProduct />}
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}