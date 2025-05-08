import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loader from "../featuers/UI/Loader";

const NonAuthRoutes = () => {
	const { isLogin, isLoading } = useAuth();
	if (isLoading) {
		return <Loader />;
	}

	return !isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default NonAuthRoutes;
