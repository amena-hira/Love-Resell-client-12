import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loading from '../../pages/shared/Loading/Loading';

const SellerRoute = ({children}) => {
    const { user, loading } =   useContext(AuthContext);
    const [isSeller, isSellerLoading] =  useSeller(user?.email)
    const location = useLocation();
    console.log(isSeller)
    if (loading || isSellerLoading) {
        return <Loading></Loading>
    }
    
    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" ></Navigate>;
};

export default SellerRoute;