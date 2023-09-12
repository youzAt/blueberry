import styles from "./LoginPasswordForm.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";
import keyIcon from "../assets/icons/key.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";
import eyeIcon from "../assets/icons/eye.svg";
import ErrorMessage from "./UI/ErrorMessage";
import smsIcon from "../assets/icons/sms.svg";
import { useState } from "react";
const LoginPasswordForm = () => {
	const [isPassVisible, setIsPassVisible] = useState(false);
	const [isPassWrong, setIsPassWrong] = useState(false);

	const changePassVisibility = () => {
		setIsPassVisible((cur) => !cur);
	};
	return (
		<div className={styles.loginBox}>
			<form className={styles.loginPasswordForm}>
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
						className={isPassWrong && "error"}
						id="password"
						placeholder="رمز عبور حساب خود را وارد کنید"
						type={isPassVisible ? "text" : "password"}
					/>
					{isPassWrong && (
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
			<Button isSmall={true} type="outline" className={styles.otpBtn}>
				<img src={smsIcon} alt="sms icon" />
				<span>ارسال کد یک بار مصرف از طریق پیامک</span>
			</Button>
		</div>
	);
};

export default LoginPasswordForm;
