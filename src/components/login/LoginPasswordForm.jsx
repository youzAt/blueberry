import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPasswordForm.module.css";

import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";

import keyIcon from "../../assets/icons/key.svg";
import eyeSlashIcon from "../../assets/icons/eye-slash.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import smsIcon from "../../assets/icons/sms.svg";

const BASE_URL = "http://127.0.0.1:8000/";

const LoginPasswordForm = ({ phoneNumber }) => {
	const [isPassVisible, setIsPassVisible] = useState(false);
	const [password, setPassword] = useState("");
	const [hasError, setHasError] = useState(false);
	const navigate = useNavigate();

	const changePassVisibility = () => {
		setIsPassVisible((cur) => !cur);
	};
	const passChangeHandler = (e) => {};

	const submitHandler = (e) => {};
	return (
		<div className={styles.loginBox}>
			<form className={styles.loginPasswordForm} onSubmit={submitHandler}>
				<label className="caption-lg" htmlFor="password">
					رمز عبور
				</label>
				<div className={styles.inputField}>
					<img
						src={keyIcon}
						className={styles.keyIcon}
						alt="key icon"
					/>
					<img
						src={isPassVisible ? eyeSlashIcon : eyeIcon}
						className={styles.eyeIcon}
						alt="eye icon"
						onClick={changePassVisibility}
					/>
					<Input
						className={hasError && "error"}
						id="password"
						placeholder="رمز عبور حساب خود را وارد کنید"
						type={isPassVisible ? "text" : "password"}
						value={password}
						onChange={passChangeHandler}
					/>
					{hasError && (
						<ErrorMessage>رمز وارد شده اشتباه است</ErrorMessage>
					)}
				</div>
				<Button isSmall={true} type="secondary">
					ورود به حساب
				</Button>
			</form>
			<dir className={styles.seprator}>
				<hr />
				<span className={`caption-lg ${styles.seprator}`}>یا</span>
			</dir>
			<Button
				onClick={() => {
					navigate("/login/otp");
				}}
				isSmall={true}
				type="outline"
				className={styles.otpBtn}
			>
				<img src={smsIcon} alt="sms icon" />
				<span>ارسال کد یک بار مصرف از طریق پیامک</span>
			</Button>
		</div>
	);
};

export default LoginPasswordForm;
