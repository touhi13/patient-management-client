import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import PrivateRouter from "../middlewares/PrivateRouter";
import PublicRouter from "../middlewares/PublicRouter";
import Login from "@/pages/auth/Login";
import AppShell from "@/components/app-shell";
import NotFound from "@/pages/NotFound";
import Patient from "@/pages/patient/Patient";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRouter><AppShell /></PrivateRouter>,
        children: [

            {
                path: "",
                element: (
                    <Patient />
                ),
            },

        ]
    },
    {
        path: "register",
        element: <PublicRouter><Register /></PublicRouter>,
    },
    {
        path: "login",
        element: <PublicRouter><Login /></PublicRouter>,
    },
    {
        path: 'not-found',
        element: <NotFound />,
    },

]);
