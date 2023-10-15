import styles from "./PhoneNumberSection.module.css";
import OTPInput from "react-otp-input";
import Box from "../UI/Box";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import ConfirmBox from "./ConfirmBox";
import { useState, useCallback, useEffect } from "react";

const WAITING_TIME = 30;
const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";
const OTP_LENGTH = 6;

const PhoneNumberSection = () => {
	const [inputDisable, setInputDisable] = useState(true);
	const [isChangingPhone, setIsChangingPhone] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [otp, setOtp] = useState("");
	const [remainingTime, setRemainingTime] = useState(WAITING_TIME);
	const [showConfirmAlert, setShowConfirmAlert] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [curPhoneNumber, setCurPhoneNumber] = useState("");
	const [hasPhoneError, setHasPhoneError] = useState(false);

	const accessToken = localStorage.getItem("blueberry-access");

	useEffect(() => {
		const fetchUserPhoneNumber = async () => {
			const res = await fetch(`${BASE_URL}api/account/phone-number/`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				const formattedPhoneNumber = "09" + data.Phone_number.slice(4);
				setPhoneNumber(formattedPhoneNumber);
				setCurPhoneNumber(formattedPhoneNumber);
			}
		};
		fetchUserPhoneNumber();
	}, [accessToken]);

	const sendOtp = useCallback(async () => {
		setRemainingTime(30);
		const res = await fetch(
			`${BASE_URL}api/account/change-phone/${phoneNumber}`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		if (!res.ok) {
			setHasPhoneError(true);
		} else {
			setRemainingTime(30);
			setIsChangingPhone(true);
			
		}
	}, [phoneNumber, accessToken]);

	useEffect(() => {
		if (remainingTime === 0) return;
		const timer = setInterval(() => {
			setRemainingTime((curTime) => curTime - 1);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [remainingTime]);

	const changePhoneNumberHandler = () => {
		setHasPhoneError(false);
		setOtp("");
		sendOtp();
	};
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
					const res = await fetch(
						`${BASE_URL}api/account/change-phone/`,
						{
							method: "PUT",
							headers: {
								"content-type": "application/json",
								Authorization: `Bearer ${accessToken}`,
							},
							body: JSON.stringify(userLoginInfo),
						}
					);
					if (!res.ok) throw new Error("");
					const data = await res.json();
					setShowConfirmAlert(true);
					setIsChangingPhone(false);
					setInputDisable(true);
					console.log(data);
				} catch {
					setHasError(true);
				}
			};
			validateOtp();
		}
	};

	const cancelChangePhone = () => {
		setInputDisable(true);
		setIsChangingPhone(false);
		setPhoneNumber(curPhoneNumber);
	};

	return (
		<div className={styles.section}>
			<h5 className={styles.sectionTitle}>شماره موبایل</h5>
			{showConfirmAlert && (
				<ConfirmBox btnHandler={() => setShowConfirmAlert(false)}>
					شماره موبایل با موفقیت به {curPhoneNumber} تغییر یافت.
				</ConfirmBox>
			)}
			<Box className={styles.box}>
				{isChangingPhone ? (
					<div className={styles.otpForm}>
						<p className="caption-lg">
							کد تائید به شماره {phoneNumber} ارسال شد
						</p>
						<p className="caption-lg">
							کد پیامک شده را جهت تائید شماره موبایل وارد کنید
						</p>

						<div className={styles.changePhoneOtp}>
							<OTPInput
								onChange={otpChangeHandler}
								value={otp}
								inputStyle={`body-sm ${styles.input} ${
									hasError && "error"
								}`}
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
								<Button
									onClick={sendOtp}
									isSmall={true}
									type="tertiary"
								>
									ارسال مجدد پیامک
								</Button>
							) : (
								<Button
									isSmall={true}
									type="tertiary"
									className={styles.deactiveBtn}
								>
									ارسال مجدد تا <span> {remainingTime} </span>{" "}
									ثانیه دیگر
								</Button>
							)}
							<Button
								isSmall
								type="outline"
								onClick={cancelChangePhone}
							>
								لغو
							</Button>
						</div>
					</div>
				) : (
					<div>
						<div className={styles.inputBox}>
							<label
								className="caption-lg"
								htmlFor="phone-number"
							>
								شماره موبایل
							</label>
							<Input
								onChange={(e) => setPhoneNumber(e.target.value)}
								disabled={inputDisable}
								value={phoneNumber}
								id="phone-number"
								placeholder="شماره موبایل خود را وارد کنید"
							/>
							{hasPhoneError && (
								<ErrorMessage>
									شماره وارد شده نامعتبر است
								</ErrorMessage>
							)}
						</div>
						{inputDisable ? (
							<Button
								isSmall
								type="primary"
								onClick={() => setInputDisable(false)}
							>
								ویرایش شماره موبایل
							</Button>
						) : (
							<Button
								isSmall
								type="primary"
								onClick={changePhoneNumberHandler}
							>
								ارسال کد تایید
							</Button>
						)}
					</div>
				)}
			</Box>
		</div>
	);
};

export default PhoneNumberSection;
