import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './admin/EditProduct';
import AddProduct from './admin/AddProduct';
import ProductList from './admin/ProductList';
import Navbar from './components/navbar';
import Cart from './pages/cart';
import CheckoutAddress from './pages/CheckoutAddress';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

function Layout() {
  return (<>
    <Navbar />
    <Outlet />
  </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout-address', element: <CheckoutAddress /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/order-success', element: <OrderSuccess /> },
      { path: '/admin/products', element: <ProductList /> },
      { path: '/admin/add-product', element: <AddProduct /> },
      { path: '/admin/products/:id/edit', element: <EditProduct /> }
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}