import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../pages/shared/Loading/Loading';

const AdminRoute = ({children}) => {
    const { user, loading, logout } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const location = useLocation();
    console.log('loading',loading)
    const navigate = useNavigate();

    if (user && isAdmin) {
        return children;
    }
    if (loading) {
        return <Loading></Loading>
    }
    if (isAdminLoading) {
        <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

};

export default AdminRoute;