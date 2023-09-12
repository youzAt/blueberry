import { useState } from "react";
import styles from "./LoginForm.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";
import mobileIcon from "../assets/icons/mobile.svg";

const LoginForm = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const inputChangeHandler = (e) => {
		if (isNaN(e.target.value)) return;
		setPhoneNumber(e.target.value);
	};
	return (
		<form className={styles.loginForm}>
			<label className="caption-lg" htmlFor="phone-number">
				شماره موبایل
			</label>
			<div className={styles.inputField}>
				<img
					src={mobileIcon}
					className={styles.mobileIcon}
					alt="mobile icon"
				/>
				<Input
					type="text"
					value={phoneNumber}
					onChange={inputChangeHandler}
					placeholder="شماره موبایل خود را وارد کنید"
					id="phone-number"
				/>
			</div>

			<Button isSmall={true} type="secondary">
				ورود به حساب کاربری
			</Button>
		</form>
	);
};

export default LoginForm;
