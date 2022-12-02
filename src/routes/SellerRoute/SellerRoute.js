import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loading from '../../pages/shared/Loading/Loading';

const SellerRoute = ({children}) => {
    const { user, loading, logout } =   useContext(AuthContext);
    const [isSeller, isSellerLoading] =  useSeller(user?.email)
    const location = useLocation();
    const navigate = useNavigate();

    if (user && isSeller) {
        return children;
    }
    if (loading) {
        return <Loading></Loading>
    }
    if (isSellerLoading) {
        <Loading></Loading>
    }
    if (user && isSeller) {
        return children;
    }
    // if (isSeller === false) {
    //     logout()
    //     navigate('/');
    //     return <Navigate to='/login'></Navigate>
    // }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    // return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    
};

export default SellerRoute;