import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthOnlyRoutes = () => {
	const { isLogin } = useAuth();

	return !isLogin ? <Navigate to="/login" /> : <Outlet />;
};

export default AuthOnlyRoutes;
