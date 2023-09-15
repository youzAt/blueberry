import { useCallback, useEffect, useState } from "react";
import styles from "./LoginOtpForm.module.css";
import OTPInput from "react-otp-input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import { useNavigate } from "react-router-dom";

const WAITING_TIME = 30;
const BASE_URL = "http://127.0.0.1:8000/";
const OTP_LENGTH = 6;

const LoginOtpForm = ({ phoneNumber }) => {
	const [otp, setOtp] = useState();
	const [hasError, setHasError] = useState(false);
	const [remainingTime, setRemainingTime] = useState(WAITING_TIME);
	const navigate = useNavigate();

	// send otp to user phone
	const sendOtp = useCallback(async () => {
		const res = await fetch(`${BASE_URL}api/account/otp/${phoneNumber}`);
		const data = await res.json();
	}, [phoneNumber]);

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

	// send otp when page loads
	useEffect(() => {
		sendOtp();
	}, [sendOtp]);

	const otpChangeHandler = (value) => {
		setOtp(value);
		setHasError(false);
		if (value.length === OTP_LENGTH) {
			const userLoginInfo = {
				phone_number: phoneNumber,
				otp: value,
			};
			const validateOtp = async () => {
				try {
					const res = await fetch(`${BASE_URL}api/account/login/`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify(userLoginInfo),
					});
					if (!res.ok) throw new Error("");
					const data = await res.json();
					localStorage.setItem("blueberry-access", data.access);
					localStorage.setItem("blueberry-refresh", data.refresh);
					navigate('/my-account');
				} catch {
					setHasError(true);
				}
			};
			validateOtp();
		}
	};

	return (
		<div className={styles.otpForm}>
			<p className="caption-lg">
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
