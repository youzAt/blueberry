import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const useLogout = () => {
	const { setIsLogin, setAccessToken } = useAuth();
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("blueberry-access");
		localStorage.removeItem("blueberry-refresh");
		setIsLogin(false);
		setAccessToken(null);
		navigate("/events");
	};
	return { logout };
};
