import { Outlet, useNavigate } from "react-router-dom";
import Box from "../components/UI/Box";
import MainHeader from "../components/MainHeader";
import leftArrowIcon from "../assets/icons/arrow-left.svg";
import Button from "../components/UI/Button";
import styles from './LoginPage.module.css'

const LoginPage = () => {
	const navigate = useNavigate();
	const backBtnHandler = ()=>{
		navigate('../')
	}
	return (
		<>
			<MainHeader></MainHeader>
			<main className="container">
				<div className={styles.loginBox}>
					<h5 >ورود به حساب</h5>
					<Button onClick={backBtnHandler} type="outline" className={styles.backBtn} >
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
