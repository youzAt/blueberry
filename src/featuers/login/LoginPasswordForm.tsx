import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./LoginPasswordForm.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import keyIcon from "../../assets/icons/key.svg";
import eyeSlashIcon from "../../assets/icons/eye-slash.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import smsIcon from "../../assets/icons/sms.svg";
import { usePhoneNumber } from "../../context/PhoneNumberProvider";
import { useLogin } from "./useLogin";
import { useNextUrl } from "../../context/NextUrlProvider";
import { useAuth } from "../../context/AuthProvider";
import { BeatLoader } from "react-spinners";

const LoginPasswordForm = () => {
	const [isPassVisible, setIsPassVisible] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { phoneNumber } = usePhoneNumber()!;
	const { nextUrl } = useNextUrl()!;
	const { mutate, isPending } = useLogin();
	const { setIsLogin, setAccessToken } = useAuth();

	if (!phoneNumber) return <Navigate to="/login" />;

	const changePassVisibility = () => {
		setIsPassVisible((cur) => !cur);
	};

	const passChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setHasError(false)
		setPassword(e.target.value);
	};

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		setHasError(false);

		const userLoginInfo = {
			phoneNumber,
			password,
		};
		mutate(userLoginInfo, {
			onSuccess: (data) => {
				localStorage.setItem("blueberry-access", data.access);
				localStorage.setItem("blueberry-refresh", data.refresh);
				setIsLogin(true);
				setAccessToken(data.access);
				navigate(nextUrl ? nextUrl : "/my-account");
			},
			onError: () => {
				setHasError(true);
			},
		});
	};
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
						className={hasError ? "error" : ""}
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
				<Button disabled={isPending} isSmall={true} type="primary">
					{isPending ? <BeatLoader size={8} color="#fff" /> : "ورود به حساب"}
				</Button>
			</form>
			<div className={styles.seprator}>
				<hr />
				<span className={`caption-lg ${styles.seprator}`}>یا</span>
			</div>
			<Button
				onClick={() => {
					navigate("/login/otp");
				}}
				isSmall={true}
				type="outline"
				className={styles.otpBtn}
				disabled={isPending}
			>
				<img src={smsIcon} alt="sms icon" />
				<span>ارسال کد یک بار مصرف از طریق پیامک</span>
			</Button>
		</div>
	);
};

export default LoginPasswordForm;
