import styles from "./PhoneNumberSection.module.css";
import OTPInput from "react-otp-input";
import Box from "../UI/Box";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import ConfirmBox from "./ConfirmBox";
import { useState, useEffect } from "react";
import { useUserPhoneNumber } from "./useUserPhoneNumber";
import { usePhoneOtp } from "./usePhoneOtp";
import { useValidatePhoneOtp } from "./useValidatePhoneOtp";
import Loader from "../UI/Loader";

const WAITING_TIME = 120;
const OTP_LENGTH = 6;
const OTP_TIMER = 30;

const PhoneNumberSection = () => {
	const [inputDisable, setInputDisable] = useState(true);
	const [isChangingPhone, setIsChangingPhone] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [otp, setOtp] = useState("");
	const [remainingTime, setRemainingTime] = useState(WAITING_TIME);
	const [showConfirmAlert, setShowConfirmAlert] = useState(false);
	const [newPhoneNumber, setNewPhoneNumber] = useState("");
	const [prevPhoneNumber, setPrevPhoneNumber] = useState("");
	const [hasPhoneError, setHasPhoneError] = useState(false);
	const { mutate: sendOtp, isPending } = usePhoneOtp();
	const { mutate: validateOtp } = useValidatePhoneOtp();
	const { data, isLoading } = useUserPhoneNumber();

	useEffect(() => {
		const formattedPhoneNumber = "09" + data?.Phone_number.slice(4);
		setPrevPhoneNumber(formattedPhoneNumber);
		setNewPhoneNumber(formattedPhoneNumber);
	}, [data]);
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
		sendOtp(
			{ newPhoneNumber },
			{
				onSuccess: () => {
					setRemainingTime(OTP_TIMER);
					setIsChangingPhone(true);
				},
				onError: () => {
					setHasPhoneError(true);

				},
			}
		);
	};
	const otpChangeHandler = (value: string) => {
		setOtp(value);
		if (value.length === OTP_LENGTH) {
			const userLoginInfo = {
				phone_number: newPhoneNumber,
				otp: value,
			};
			validateOtp(userLoginInfo, {
				onSuccess: () => {
					setPrevPhoneNumber(newPhoneNumber);
					setShowConfirmAlert(true);
					setIsChangingPhone(false);
					setInputDisable(true);
				},
				onError: () => {
					setHasError(true);
				},
			});
		}
	};
	const cancelChangePhone = () => {
		setInputDisable(true);
		setIsChangingPhone(false);
		setNewPhoneNumber(prevPhoneNumber);
	};

	return (
		<div className={styles.section}>
			<h5 className={styles.sectionTitle}>شماره موبایل</h5>
			{showConfirmAlert && (
				<ConfirmBox btnHandler={() => setShowConfirmAlert(false)}>
					شماره موبایل با موفقیت به {prevPhoneNumber} تغییر یافت.
				</ConfirmBox>
			)}
			<Box className={styles.box}>
				{isLoading ? (
					<Loader />
				) : isChangingPhone ? (
					<div className={styles.otpForm}>
						<p className="caption-lg">
							کد تائید به شماره {newPhoneNumber} ارسال شد
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
									onClick={changePhoneNumberHandler}
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
					<div className={styles.changePhoneNumber}>
						<div className={styles.inputBox}>
							<label
								className="caption-lg"
								htmlFor="phone-number"
							>
								شماره موبایل
							</label>
							<Input
								onChange={(e) => {
									setHasPhoneError(false);
									setNewPhoneNumber(e.target.value);
								}}
								disabled={inputDisable}
								value={newPhoneNumber}
								id="phone-number"
								placeholder="شماره موبایل خود را وارد کنید"
								className={hasPhoneError ? "error" : ""}
							/>
							{hasPhoneError && (
								<ErrorMessage>شماره موبایل وارد شده تکراری یا اشتباه است.</ErrorMessage>
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
								disabled={isPending}
							>
								{
									isPending ? "درحال ارسال کد تایید..." : "ارسال کد تایید"
								}
							</Button>
						)}
					</div>
				)}
			</Box>
		</div>
	);
};

export default PhoneNumberSection;
