import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import SellerLayout from "../../layout/Seller/SellerLayout";
import AddCategory from "../../pages/AddCategory/AddCategory";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import AddProduct from "../../pages/Seller/AddProduct/AddProduct";

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
            }
        ]
    },
    {
        path:'/seller',
        element: <SellerLayout></SellerLayout>,
        children:[
            {
                path:'/seller/addproduct',
                element: <AddProduct></AddProduct>
            }
        ]
    }
])

export default routes;