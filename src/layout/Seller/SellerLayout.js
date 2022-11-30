import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/shared/Navbar';

const SellerLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default SellerLayout;