import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/favicon.ico'
import { AuthContext } from '../../context/AuthProvider';
import useSeller from '../../hooks/useSeller';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const [isSeller] =  useSeller(user?.email)
    const handleLogout = () =>{
        logout()
        .then(()=>{})
        .catch(error=>console.log(error))
    }
    const menulist = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/addcategory'>Category</Link></li>
        {
            user && !isSeller &&
            <>
                <li><Link to='/myorders'>My Orders</Link></li>
                <li><Link to='/mywishlists'>My Wishlist</Link></li>
            </>
        }
        {
            isSeller && user &&
            <>
                <li><Link to='/seller/addproduct'>Add Product</Link></li>
                <li><Link to='/seller/myproducts'>My Products</Link></li>
                <li><Link to='/seller/mybuyers'>My Buyers</Link></li>
            </>
        }
        

    </>


    
    return (
        <div className='bg-pink-800 text-white'>
            <div className='max-w-6xl mx-auto py-3'>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-pink-800 rounded-box w-52">
                                {menulist}
                            </ul>
                        </div>
                        <Link className="btn btn-ghost normal-case text-xl" to='/'>
                            <img className='rounded-full mx-2' src={logo} alt="" />
                            Love Resell
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {menulist}

                        </ul>
                    </div>
                    <div className="navbar-end">
                        {
                            user?
                            <Link onClick={handleLogout}>Logout</Link>
                            :
                            <Link to='/login'>Login</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;