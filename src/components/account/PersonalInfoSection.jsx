import { useEffect, useReducer, useState } from "react";
import Box from "../UI/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./PersonalInfoSection.module.css";
import ConfirmBox from "./ConfirmBox";
import ErrorMessage from "../UI/ErrorMessage";
import useUrl from "../../hooks/useUrl";


const initialProfille = {
	firstName: "",
	lastName: "",
	meliCode: "",
	studentNumber: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "inputChange":
			return { ...state, [action.key]: action.payload };
			case "setState":
			return { ...state, ...action.payload };
			default:
				throw new Error("Unknown action type");
			}
		};
		
		const PersonalInfoSection = () => {
	const BASE_URL = useUrl();
	const [userProfile, dispatch] = useReducer(reducer, initialProfille);
	const { firstName, lastName, meliCode, studentNumber } = userProfile;
	const [hasError, setHasError] = useState("");
	const [inputError, setInputError] = useState("");
	const [isSend, setIsSend] = useState(false);
	const accessToken = localStorage.getItem("blueberry-access");

	useEffect(() => {
		const fetchPersonalInfo = async () => {
			const res = await fetch(`${BASE_URL}api/account/profile/`, {
				method: "PUT",
				headers: {
					"content-type": "application",
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data = await res.json();
			const userPersonalInfo = {
				studentNumber: data.student_id,
				meliCode: data.personal_id,
				firstName: data.first_name,
				lastName: data.last_name,
			};
			dispatch({ type: "setState", payload: userPersonalInfo });
		};
		fetchPersonalInfo();
	}, [accessToken, dispatch, BASE_URL]);

	const inputChangeHandler = (e) => {
		dispatch({
			type: "inputChange",
			key: e.target.name,
			payload: e.target.value,
		});
		setInputError("");
	};
	const formSubmitHandler = (e) => {
		e.preventDefault();
		if (
			!/^\d+$/.test(userProfile.meliCode) ||
			userProfile.meliCode.length !== 10
		) {
			setInputError("meliCode");
			return;
		} else if (
			!/^\d+$/.test(userProfile.studentNumber) ||
			userProfile.studentNumber.length < 10 ||
			userProfile.studentNumber.length > 11
		) {
			setInputError("studentNumber");
			return;
		}
		setIsSend(false);
		const userPersonalInfo = {
			student_id: studentNumber,
			personal_id: meliCode,
			first_name: firstName,
			last_name: lastName,
		};
		const editProfile = async () => {
			const res = await fetch(`${BASE_URL}api/account/profile/`, {
				method: "PUT",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(userPersonalInfo),
			});
			const data = await res.json();
			if (res.ok) {
				setIsSend(true);
			} else {
				setHasError(Object.values(data).at(0));
			}
		};
		editProfile();
	};
	return (
		<div className={styles.section}>
			<h5 className={styles.sectionTitle}>اطلاعات فردی</h5>
			{isSend && (
				<ConfirmBox btnHandler={() => setIsSend(false)}>
					اطلاعات شما با موفقیت تغییر یافت
				</ConfirmBox>
			)}
			{hasError && (
				<ConfirmBox btnHandler={() => setHasError("")} isError>
					{hasError}
				</ConfirmBox>
			)}
			<Box className={styles.box}>
				<form onSubmit={formSubmitHandler}>
					<div className={styles.formBox}>
						<div className={styles.inputBox}>
							<label className="caption-lg" htmlFor="first-name">
								نام
							</label>
							<Input
								onChange={inputChangeHandler}
								value={firstName}
								name="firstName"
								id="first-name"
								placeholder="نام خود را وارد کنید"
							/>
						</div>
						<div className={styles.inputBox}>
							<label className="caption-lg" htmlFor="last-name">
								نام خانوادگی
							</label>
							<Input
								onChange={inputChangeHandler}
								value={lastName}
								name="lastName"
								id="last-name"
								placeholder="نام خانوادگی خود را وارد کنید"
							/>
						</div>

						<div className={styles.inputBox}>
							<label className="caption-lg" htmlFor="meli-code">
								کد ملی
							</label>
							<Input
								onChange={inputChangeHandler}
								value={meliCode}
								name="meliCode"
								id="meli-code"
								placeholder="کد ملی خود را وارد کنید"
								className={inputError === "meliCode" && "error"}
								type="number"
							/>
							{inputError === "meliCode" && (
								<ErrorMessage>
									کد ملی وارد شده نامعتبر است.
								</ErrorMessage>
							)}
						</div>
						<div className={styles.inputBox}>
							<label
								className="caption-lg"
								htmlFor="student-number"
							>
								شماره دانشجویی
							</label>
							<Input
								onChange={inputChangeHandler}
								value={studentNumber}
								name="studentNumber"
								id="student-number"
								placeholder="مثلا : 40012345678"
								className={
									inputError === "studentNumber" && "error"
								}
								type="number"
							/>
							{inputError === "studentNumber" && (
								<ErrorMessage>
									شماره دانشجویی وارد شده نامعتبر است.
								</ErrorMessage>
							)}
						</div>
					</div>
					<Button isSmall type="primary">
						ذخیره تغییرات
					</Button>
				</form>
			</Box>
		</div>
	);
};

export default PersonalInfoSection;
