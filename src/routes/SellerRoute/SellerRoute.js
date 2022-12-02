import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loading from '../../pages/shared/Loading/Loading';

const SellerRoute = ({children}) => {
    const { user, loading, logout } =   useContext(AuthContext);
    const [isSeller, isSellerLoading] =  useSeller(user?.email)
    const location = useLocation();
    // console.log(isSeller)
    console.log('seller loading :',isSellerLoading)
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    if (loading || isSellerLoading) {
        return <Loading></Loading>
    }
    
    if (user && isSeller) {
        return children;
    }
    

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;