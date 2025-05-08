import { Outlet, useLocation } from "react-router-dom";
import leftArrowIcon from "../assets/icons/arrow-left.svg";
import styles from "./Login.module.css";
import { useBack } from "../hooks/useBack";
import Button from "../featuers/UI/Button";
import Box from "../featuers/UI/Box";
const Login = () => {
	document.title = "Blue Berry | Login"
	const navigate = useBack();
	const location = useLocation();
	return (
		<main className={`container ${styles.container}`}>
			<div className={styles.loginBox}>
				<h5>
					{location.key === "default"
						? "ورود یا ثبت نام"
						: "ورود به حساب کاربری"}
				</h5>
				<Button
					onClick={navigate}
					type="outline"
					className={styles.backBtn}
				>
					<img src={leftArrowIcon} alt="left arrow icon" />
				</Button>
				<Box className={styles.box}>
					<Outlet />
				</Box>
			</div>
		</main>
	);
};

export default Login;
