import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "../components/UI/Box";
import leftArrowIcon from "../assets/icons/arrow-left.svg";
import Button from "../components/UI/Button";
import styles from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import getAccess from "../funcs/getAccess";
import useUrl from "../hooks/useUrl";
import Loader from '../components/UI/Loader'

const LoginPage = () => {
	document.title = "Blue Berry | Login"
	const navigate = useNavigate();
	const backBtnHandler = () => {
		navigate(-1);
	};
	const location = useLocation();
	const BASE_URL = useUrl();
	const [isLoadig, setIsLoading] = useState(false);

	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
	useEffect(() => {
		const loginCheck = async () => {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}api/account/phone-number/`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) {
				const isLogin = await getAccess(setToken);
				if (isLogin) {
					navigate("/events");
				}
			} else {
				navigate("/events");
			}
			setIsLoading(false)
		};
		loginCheck();
	}, [token, BASE_URL, navigate]);

	return (
		<main className={`container ${styles.container}`}>
			{isLoadig ? <Loader /> : 
			<div className={styles.loginBox}>
				<h5>
					{location.key === "default"
						? "ورود یا ثبت نام"
						: "ورود به حساب کاربری"}
				</h5>
				<Button
					onClick={backBtnHandler}
					type="outline"
					className={styles.backBtn}
				>
					<img src={leftArrowIcon} alt="left arrow icon" />
				</Button>
				<Box className={styles.box}>
					<Outlet context={{isLoadig, setIsLoading}} />
				</Box>
			</div>}
		</main>
	);
};

export default LoginPage;
