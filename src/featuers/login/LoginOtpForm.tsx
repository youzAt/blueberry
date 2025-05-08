import { HTMLProps, useEffect, useState } from "react";
import styles from "./LoginOtpForm.module.css";
import OTPInput from "react-otp-input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { usePhoneNumber } from "../../context/PhoneNumberProvider";
import { useNextUrl } from "../../context/NextUrlProvider";
import { useSentOtp } from "./useSendOtp";
import { useLogin } from "./useLogin";
import { useAuth } from "../../context/AuthProvider";

const WAITING_TIME = 120;
const OTP_LENGTH = 6;

const LoginOtpForm = () => {
	const { phoneNumber } = usePhoneNumber()!;
	const { nextUrl } = useNextUrl()!;
	const [otp, setOtp] = useState("");
	const [hasError, setHasError] = useState(false);
	const [remainingTime, setRemainingTime] = useState(WAITING_TIME);
	const navigate = useNavigate();
	const { mutate: sendOtp } = useSentOtp();
	const { mutate: login } = useLogin();
	const { setAccessToken, setIsLogin } = useAuth();

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
		sendOtp({ phoneNumber });
	}, [sendOtp, phoneNumber]);

	const otpChangeHandler = (value: string) => {
		setOtp(value);
		setHasError(false);
		if (value.length === OTP_LENGTH) {
			const userLoginInfo = {
				phoneNumber,
				otp: value,
			};
			login(userLoginInfo, {
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
		}
	};

	const sendOtpHandler = () => {
		setRemainingTime(WAITING_TIME);
		sendOtp({ phoneNumber });
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
				renderInput={(props: HTMLProps<HTMLInputElement>) => (
					<input {...props} />
				)}
				containerStyle={styles.otpContainer}
				inputType="tel"
			/>
			{hasError && (
				<ErrorMessage className={styles.error}>
					کد وارد شده اشتباه است
				</ErrorMessage>
			)}
			{remainingTime === 0 ? (
				<Button onClick={sendOtpHandler} isSmall={true} type="tertiary">
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
