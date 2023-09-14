import { useCallback, useEffect, useState } from "react";
import styles from "./LoginOtpForm.module.css";
import OTPInput from "react-otp-input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";

const WAITING_TIME = 30;
const BASE_URL = "http://127.0.0.1:8000/";

const LoginOtpForm = ({ phoneNumber }) => {
	const [otp, setOtp] = useState();
	const [hasError, setHasError] = useState(false);
	const [remainingTime, setRemainingTime] = useState(WAITING_TIME);

	// resend-button timer
	useEffect(() => {
		if (remainingTime === 0) return;
		const timer = setInterval(() => {
			setRemainingTime((curTime) => curTime - 1);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [remainingTime]);

	const otpChangeHandler = () => {};
	const sendOtp = () => {};

	return (
		<div className={styles.otpForm}>
			<p className={`caption-lg `}>
				کد پیامک شده برای {phoneNumber} را وارد کنید
			</p>
			<OTPInput
				onChange={otpChangeHandler}
				value={otp}
				inputStyle={`body-sm ${styles.input} ${hasError && "error"}`}
				numInputs={6}
				separator={<span></span>}
				renderInput={(props) => <input {...props} />}
				containerStyle={styles.otpContainer}
				inputType="tel"
			/>
			{hasError && (
				<ErrorMessage className={styles.error}>
					کد وارد شده اشتباه است
				</ErrorMessage>
			)}
			{remainingTime === 0 ? (
				<Button onClick={sendOtp} isSmall={true} type="tertiary">
					ارسال مجدد پیامک
				</Button>
			) : (
				<Button
					isSmall={true}
					type="tertiary"
					className={styles.deactiveBtn}
				>
					ارسال مجدد تا <span> {remainingTime} </span> ثانیه دیگر
				</Button>
			)}
		</div>
	);
};

export default LoginOtpForm;
