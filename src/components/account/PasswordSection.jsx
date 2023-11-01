import styles from "./PasswordSection.module.css";
import Box from "../UI/Box";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import ErrorMessage from "../UI/ErrorMessage";
import ConfirmBox from "./ConfirmBox";
import CheckListItem from "../UI/CheckListItem";
import eyeSlashIcon from "../../assets/icons/eye-slash.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import useUrl from "../../hooks/useUrl";

const PasswordSection = () => {
	const BASE_URL = useUrl();
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [isPasswordChanged, setIsPasswordChanged] = useState(false);
	const [hasPassword, setHasPassword] = useState(false);
	const [passLengthCheck, setPassLengthCheck] = useState(false);
	const [passNumberCheck, setPassNumberCheck] = useState(false);
	const [passAlphaCheck, setPassAlphaCheck] = useState(false);
	const [isOldPassVisible, setIsOldPassVisible] = useState(false);
	const [isNewPassVisible, setIsNewPassVisible] = useState(false);
	const [isNewPassRepeatVisible, setIsNewPassRepeatVisible] = useState(false);

	const changeOldPassVisibility = () => {
		setIsOldPassVisible((cur) => !cur);
	};
	const changeNewPassVisibility = () => {
		setIsNewPassVisible((cur) => !cur);
	};
	const changeNewPassRepeatVisibility = () => {
		setIsNewPassRepeatVisible((cur) => !cur);
	};

	const [error, setError] = useState("");

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
		} else {
			
			setError("رمز عبور فعلی صحیح نمی باشد");
		}
	};

	useEffect(() => {
		const checkPassStat = async () => {
			const res = await fetch(`${BASE_URL}api/account/user/password/`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data = await res.json();
			setHasPassword(data.password);
		};
		checkPassStat();
	}, [accessToken, BASE_URL]);

	const addPassHandler = (e) => {
		e.preventDefault();
		setError("");
		if (!passAlphaCheck || !passChangeHandler || !passLengthCheck) return;
		if (newPassword !== newPasswordRepeat) {
			setError("رمز عبور با تکرار آن مطابقت ندارد");
			
			return;
		}
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

	const passChangeHandler = (e) => {
		setNewPassword(e.target.value);
		setPassLengthCheck(e.target.value.length >= 8);
		const regexNumber = /\d/;
		setPassNumberCheck(regexNumber.test(e.target.value));
		const regexUpper = /[A-Z]/;
		setPassAlphaCheck(regexUpper.test(e.target.value));
	};

	return (
		<div className={styles.section}>
			<h5 className={styles.sectionTitle}>
				{hasPassword ? "تغییر رمز عبور" : "افزودن رمز عبور"}
			</h5>
			{isPasswordChanged && (
				<ConfirmBox btnHandler={() => setIsPasswordChanged(false)}>
					رمز عبور شما با موفقیت تغییر یافت
				</ConfirmBox>
			)}
			<Box className={styles.box}>
				<form onSubmit={addPassHandler}>
					{hasPassword ? (
						<>
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
									type={
										isOldPassVisible ? "text" : "password"
									}
								/>
								<img
									src={
										isOldPassVisible
											? eyeSlashIcon
											: eyeIcon
									}
									className={styles.eyeIcon}
									alt="eye icon"
									onClick={changeOldPassVisibility}
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
									onChange={passChangeHandler}
									id="password"
									placeholder="رمز عبور جدید خود را وارد کنید"
									type={
										isNewPassVisible ? "text" : "password"
									}
								/>
								<img
									src={
										isNewPassVisible
											? eyeSlashIcon
											: eyeIcon
									}
									className={styles.eyeIcon}
									alt="eye icon"
									onClick={changeNewPassVisibility}
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
									type={
										isNewPassRepeatVisible
											? "text"
											: "password"
									}
								/>
								<img
									src={
										isNewPassRepeatVisible
											? eyeSlashIcon
											: eyeIcon
									}
									className={styles.eyeIcon}
									alt="eye icon"
									onClick={changeNewPassRepeatVisibility}
								/>
							</div>
						</>
					) : (
						<>
							<div className={styles.inputBox}>
								<label
									className="caption-lg"
									htmlFor="password"
								>
									رمز عبور
								</label>
								<Input
									value={newPassword}
									onChange={passChangeHandler}
									id="password"
									placeholder="رمز عبور خود را وارد کنید"
									type={
										isNewPassVisible ? "text" : "password"
									}
								/>
								<img
									src={
										isNewPassVisible
											? eyeSlashIcon
											: eyeIcon
									}
									className={styles.eyeIcon}
									alt="eye icon"
									onClick={changeNewPassVisibility}
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
									type={
										isNewPassRepeatVisible
											? "text"
											: "password"
									}
								/>
								<img
									src={
										isNewPassRepeatVisible
											? eyeSlashIcon
											: eyeIcon
									}
									className={styles.eyeIcon}
									alt="eye icon"
									onClick={changeNewPassRepeatVisibility}
								/>
							</div>
						</>
					)}
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<div className={styles.checkListBox}>
						<CheckListItem
							className={!passNumberCheck && "deactive"}
						>
							رمز عبور متشکل از حداقل یک رقم 9-0 باشد
						</CheckListItem>
						<CheckListItem
							className={!passAlphaCheck && "deactive"}
						>
							رمز عبور متشکل از حداقل یک کاراکتر از حروف بزرگ
							انگلیسی A-Z باشد
						</CheckListItem>
						<CheckListItem
							className={!passLengthCheck && "deactive"}
						>
							رمز عبور حداقل ۸ کاراکتر باشد
						</CheckListItem>
					</div>
					{hasPassword ? (
						<Button isSmall type="primary">
							تغییر رمز عبور
						</Button>
					) : (
						<Button isSmall type="primary">
							افزودن رمز عبور
						</Button>
					)}
				</form>
			</Box>
		</div>
	);
};

export default PasswordSection;
