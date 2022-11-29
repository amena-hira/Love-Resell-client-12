import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import AddCategory from "../../pages/AddCategory/AddCategory";
import Home from "../../pages/Home/Home";

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
                path: '/addcategory',
                element: <AddCategory></AddCategory>
            }
        ]
    }
])

export default routes;