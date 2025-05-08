import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { api } from "../services/apiAxios";
interface Auth {
	isLogin: boolean;
	setIsLogin: Dispatch<SetStateAction<boolean>>;
	setAccessToken: Dispatch<SetStateAction<string | null>>;
	isLoading: boolean;
}
const authContext = createContext<Auth | null>(null);

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		throw new Error("Auth context must be used inside AuthProvider");
	}
	return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [accessToken, setAccessToken] = useState(() =>
		localStorage.getItem("blueberry-access")
	);
	const [refreshToken, setRefreshToken] = useState(() =>
		localStorage.getItem("blueberry-refresh")
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem("blueberry-access")));

	useEffect(() => {
		const loginCheck = async () => {
			setIsLoading(true);
			if (!accessToken) {
				setIsLogin(false);
				setIsLoading(false);
				return;
			}
			try {
				await api.get("/account/phone-number/");
				setIsLogin(true);
			} catch {
				localStorage.removeItem("blueberry-access");
				localStorage.removeItem("blueberry-refresh");
				setIsLogin(false);
			} finally {
				setIsLoading(false);
			}
		};
		loginCheck();
	}, [accessToken]); // <-- Dependency on accessToken

	useLayoutEffect(() => {
		const authInterceptor = api.interceptors.request.use((config) => {
			config.headers.Authorization = accessToken
				? `Bearer ${accessToken}`
				: config.headers.Authorization;
			return config;
		});
		return () => {
			api.interceptors.request.eject(authInterceptor);
		};
	}, [accessToken]);

	useLayoutEffect(() => {
		const refreshInterceptor = api.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;
				if (
					error.response.status === 401 &&
					error.response.data.code === "token_not_valid"
				) {
					try {
						const response = await api.post(
							"/account/login/refresh/",
							{
								refresh: refreshToken,
							}
						);
						setAccessToken(response.data.access);
						localStorage.setItem(
							"blueberry-access",
							response.data.access
						);
						setIsLogin(true);

						originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
						originalRequest._retry = true;
						return api(originalRequest);
					} catch {
						localStorage.removeItem("blueberry-access");
						localStorage.removeItem("blueberry-refresh");
						setAccessToken(null);
						setRefreshToken(null);
						setIsLogin(false);
					}
				}
				return Promise.reject(error);
			}
		);
		return () => {
			api.interceptors.response.eject(refreshInterceptor);
		};
	}, [refreshToken]);
	return (
		<authContext.Provider
			value={{ isLogin, setIsLogin, setAccessToken, isLoading }}
		>
			{children}
		</authContext.Provider>
	);
};

export default AuthProvider;
