// hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// styles
import styles from "./LoginForm.module.css";

// logo and icons
import mobileIcon from "../../assets/icons/mobile.svg";

// components
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { phoneValidate } from "../../utils/helpers";
import { usePhoneNumber } from "../../context/PhoneNumberProvider";
import { useCheckPassword } from "./useCheckPassword";
import { BeatLoader } from "react-spinners";

const LoginForm = () => {
	const { phoneNumber, setPhoneNumber } = usePhoneNumber()!;
	const [hasError, setHasError] = useState(false);
	const { mutate: checkPassword, isPending } = useCheckPassword();
	const navigate = useNavigate();

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setHasError(false);
		if (isNaN(+e.target.value)) return;
		setPhoneNumber(e.target.value);
	};

	useEffect(() => {
		setPhoneNumber("");
	}, [setPhoneNumber]);

	const submitHander = (e: FormEvent) => {
		e.preventDefault(); // stop page refresh
		setHasError(false);
		if (!phoneValidate(phoneNumber)) {
			setHasError(true);
			return;
		}

		checkPassword(phoneNumber, {
			onSuccess: ({ password }) => {
				password ? navigate("./password") : navigate("./otp");
			},
			onError: () => {
				setHasError(true);
			},
		});
	};

	return (
		<form className={styles.loginForm} onSubmit={submitHander}>
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
					className={hasError ? "error" : ""}
					type="text"
					value={phoneNumber}
					onChange={inputChangeHandler}
					placeholder="شماره موبایل خود را وارد کنید"
					id="phone-number"
					disabled={isPending}
				/>
				{hasError && (
					<ErrorMessage>شماره وارد شده نامعتبر است</ErrorMessage>
				)}
			</div>
			<Button isSmall={true} disabled={isPending} type="primary">
				{isPending ? (
					<BeatLoader size={8} color="#fff" />
				) : (
					"ورود به حساب کاربری"
				)}
			</Button>
		</form>
	);
};

export default LoginForm;
