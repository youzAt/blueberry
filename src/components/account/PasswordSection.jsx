import styles from "./PasswordSection.module.css";
import Box from "../UI/Box";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import ErrorMessage from "../UI/ErrorMessage";
import ConfirmBox from "./ConfirmBox";
const BASE_URL = "http://127.0.0.1:8000/";

const PasswordSection = ({ phoneNumber }) => {
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [isPasswordChanged, setIsPasswordChanged] = useState(false);
	const accessToken = localStorage.getItem("blueberry-access");

	const sendPass = async (userPass) => {
		const res = await fetch(`${BASE_URL}api/account/set-password/`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(userPass),
		});
		if (res.ok) {
			setHasPassword(true);
			setIsPasswordChanged(true);
		}

		const data = await res.json();
		console.log(res);
		console.log(data);
	};

	const [hasPassword, setHasPassword] = useState(false);
	useEffect(() => {
		const userPhone = {
			phone_number: phoneNumber,
		};
		const checkPhone = async () => {
			const res = await fetch(`${BASE_URL}api/account/account-stat/`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(userPhone),
			});
			if (!res.ok) throw new Error("");
			const data = await res.json();
			setHasPassword(data.password);
		};
		checkPhone();
	}, [phoneNumber]);

	const addPassHandler = (e) => {
		e.preventDefault();
		const userPass = {
			password: newPassword,
			password_confirmation: newPasswordRepeat,
		};

		sendPass(
			oldPassword === ""
				? userPass
				: { ...userPass, old_password: oldPassword }
		);
		setNewPassword("");
		setNewPasswordRepeat("");
		setOldPassword("");
	};

	return (
		<div className={styles.section}>
			{hasPassword ? (
				<>
					<h5 className={styles.sectionTitle}>تغییر رمز عبور</h5>
					{isPasswordChanged && (
						<ConfirmBox
							btnHandler={() => setIsPasswordChanged(false)}
						>
							رمز عبور شما با موفقیت تغییر یافت
						</ConfirmBox>
					)}
					<Box className={styles.box}>
						<form onSubmit={addPassHandler}>
							<div className={styles.inputBox}>
								<label
									className="caption-lg"
									htmlFor="current-password"
								>
									رمز عبور فعلی
								</label>
								<Input
									value={oldPassword}
									onChange={(e) =>
										setOldPassword(e.target.value)
									}
									id="current-password"
									placeholder="رمز عبور فعلی حساب خود را وارد کنید"
									type="password"
								/>
							</div>
							<div className={styles.inputBox}>
								<label
									className="caption-lg"
									htmlFor="password"
								>
									رمز عبور جدید
								</label>
								<Input
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									id="password"
									placeholder="رمز عبور جدید خود را وارد کنید"
									type="password"
								/>
							</div>
							<div className={styles.inputBox}>
								<label
									className="caption-lg"
									htmlFor="password-confirm"
								>
									تکرار رمز عبور جدید
								</label>
								<Input
									value={newPasswordRepeat}
									onChange={(e) =>
										setNewPasswordRepeat(e.target.value)
									}
									id="password-confirm"
									placeholder="رمز عبور جدید خود را دوباره وارد کنید"
									type="password"
								/>
							</div>

							<Button isSmall type="secondary">
								تغییر رمز عبور
							</Button>
						</form>
					</Box>
				</>
			) : (
				<>
					<h5 className={styles.sectionTitle}>افزودن رمز عبور</h5>
					<Box className={styles.box}>
						<form onSubmit={addPassHandler}>
							<div className={styles.inputBox}>
								<label
									className="caption-lg"
									htmlFor="password"
								>
									رمز عبور
								</label>
								<Input
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									id="password"
									placeholder="رمز عبور خود را وارد کنید"
									type="password"
								/>
							</div>
							<div className={styles.inputBox}>
								<label
									className="caption-lg"
									htmlFor="password-confirm"
								>
									تکرار رمز عبور
								</label>
								<Input
									value={newPasswordRepeat}
									onChange={(e) =>
										setNewPasswordRepeat(e.target.value)
									}
									id="password-confirm"
									placeholder="رمز عبور خود را دوباره وارد کنید"
									type="password"
								/>
								{/* {passRepeatError && (
									<ErrorMessage>
										تکرار رمز عبور را درست وارد کنید
									</ErrorMessage>
								)} */}
							</div>

							<Button isSmall type="secondary">
								افزودن رمز عبور
							</Button>
						</form>
					</Box>
				</>
			)}
		</div>
	);
};

export default PasswordSection;
