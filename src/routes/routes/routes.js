import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../layout/Admin/AdminLayout";
import Main from "../../layout/Main/Main";
import SellerLayout from "../../layout/Seller/SellerLayout";
import AddCategory from "../../pages/AddCategory/AddCategory";
import AllSellers from "../../pages/Admin/AllSellers/AllSellers";
import AllUsers from "../../pages/Admin/AllUsers/AllUsers";
import ReportedItems from "../../pages/Admin/ReportedItems/ReportedItems";
import Blog from "../../pages/Blog/Blog";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import MyOrders from "../../pages/MyOrders/MyOrders";
import Payment from "../../pages/Payment/Payment";
import Products from "../../pages/Products/Products";
import Register from "../../pages/Register/Register";
import AddProduct from "../../pages/Seller/AddProduct/AddProduct";
import MyProducts from "../../pages/Seller/MyProducts/MyProducts";
import NotFound from "../../pages/shared/NotFound/NotFound";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/products/:id',
                loader:({params}) => fetch(`http://localhost:5000/products/category/${params.id}`),
                element: <Products></Products>
            },
            {
                path: '/myOrders',
                element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            },
            {
                path: '/payment/:id',
                loader:({params}) => fetch(`http://localhost:5000/order/payment/${params.id}`),
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
        ]
    },
    {
        path:'/seller',
        element: <SellerLayout></SellerLayout>,
        children:[
            {
                path:'/seller/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path:'/seller/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
        ]
    },
    {
        path:'/admin',
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                path: '/admin/allsellers',
                element:<AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/admin/addcategory',
                element: <AdminRoute><AddCategory></AddCategory></AdminRoute>
            },
            {
                path: '/admin/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/admin/reporteditems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
        ]
    },
    {
        path:'*',
        element: <NotFound></NotFound>
    }
])

export default routes;