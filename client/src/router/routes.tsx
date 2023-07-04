import {createBrowserRouter} from "react-router-dom";
import {AuthPage} from "../pages/AuthPage/AuthPage";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                path: 'auth/login',
                element: (
                    <AuthPage/>
                ),
            },
        ],
    },
]);