import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Componentes from "../pages/Componentes";
import Administracion from "../pages/Administracion";
import ABMfactura from "../pages/ABMfactura";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoutes";
import LoginAuth from "../components/LoginAuth/LoginAuth";

const AppRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/homepage' element={<PrivateRoute element={<ABMfactura />} />} />
                <Route path='/componentes' element={<Componentes />} />
                <Route path='/administracion' element={<PrivateRoute element={<Administracion />} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/login-Auth' element={<LoginAuth />} />
            </Routes>
        </>
    )
}

export default AppRoutes;