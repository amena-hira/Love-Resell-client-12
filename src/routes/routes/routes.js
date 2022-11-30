import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import AddCategory from "../../pages/AddCategory/AddCategory";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

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
    }
])

export default routes;