import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import AddCategory from "../../pages/AddCategory/AddCategory";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/addcategory',
                element: <AddCategory></AddCategory>
            }
        ]
    }
])

export default routes;