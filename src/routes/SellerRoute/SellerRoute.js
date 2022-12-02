import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loading from '../../pages/shared/Loading/Loading';

const SellerRoute = ({children}) => {
    const { user, loading } =   useContext(AuthContext);
    const [isSeller, isSellerLoading] =  useSeller(user?.email)
    const location = useLocation();

    if (user && isSeller) {
        return children;
    }
    if (loading) {
        return <Loading></Loading>
    }
    if (isSellerLoading) {
        <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    
};

export default SellerRoute;