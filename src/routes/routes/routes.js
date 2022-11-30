import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import SellerLayout from "../../layout/Seller/SellerLayout";
import AddCategory from "../../pages/AddCategory/AddCategory";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Products from "../../pages/Products/Products";
import Register from "../../pages/Register/Register";
import AddProduct from "../../pages/Seller/AddProduct/AddProduct";
import MyProducts from "../../pages/Seller/MyProducts/MyProducts";
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
                path: '/addcategory',
                element: <AddCategory></AddCategory>
            },
            {
                path: '/product',
                element: <AddCategory></AddCategory>
            },
            {
                path: '/products/:id',
                loader:({params}) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <Products></Products>
            }
        ]
    },
    {
        path:'/seller',
        element: <SellerLayout></SellerLayout>,
        children:[
            {
                path:'/seller/addproduct',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path:'/seller/myproducts',
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
        ]
    }
])

export default routes;