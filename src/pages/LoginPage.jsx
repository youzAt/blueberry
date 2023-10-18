import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "../components/UI/Box";
import leftArrowIcon from "../assets/icons/arrow-left.svg";
import Button from "../components/UI/Button";
import styles from "./LoginPage.module.css";
import MainHeader from "../components/MainHeader";

const LoginPage = () => {
	const navigate = useNavigate();
	const backBtnHandler = () => {
		navigate(-1);
	};
	const location = useLocation();

	return (
		<>
			<MainHeader removeBtn />
			<main className="container">
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
						<Outlet />
					</Box>
				</div>
			</main>
		</>
	);
};

export default LoginPage;
