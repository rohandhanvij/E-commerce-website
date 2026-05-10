import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function Navbar() {
    const navigate = useNavigate()
    const [cartCount, setCartCount] = useState(0)
    const userid = localStorage.getItem('userId')
    
    useEffect(() => {
        const loadcart = async () => {
            if (!userid) return setCartCount(0) 
        const res = await api.get(`/cart/${userid}`)
        const total = res.data.items.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(total)
        }
        loadcart()
        window.addEventListener('cartUpdated', loadcart)
        return () => window.removeEventListener('cartUpdated', loadcart)

    }, [userid]);
    const logout = () => {
        localStorage.clear()
        setCartCount(0)
        navigate('/login')
    }

    return (
        <nav className="flex justify-between p-4 shadow-md">
            <Link to="/" className="text-xl font-bold">My store</Link>
            <div className="flex gap-4 items-center "> 
                <Link to="/cart" className="relative text-xl">
                   🛒
                   {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded">
                        {cartCount}
                    </span>
                   )}
                </Link>

                {
                    !userid ?
                    <>
                        <Link to="/login" className="text-xl">Login</Link>
                        <Link to="/signup" className="text-xl">Register</Link>
                    </>
                    :
                    <button onClick={logout} className="text-xl">Logout</button>
                }
            </div>
        </nav>
    )
}