import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/login', element: <Login />},
  {path: '/signup', element: <Signup />},
  {path: '/product/:id', element: <ProductDetail />}
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}