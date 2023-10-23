import { useEffect, useState } from "react";
import Box from "../UI/Box";
import Input from "../UI/Input";
import styles from "./SignupForm.module.css";
import ErrorMessage from "../UI/ErrorMessage";
const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";

const SignupForm = ({
	slug,
	fields,
	setFields,
	hasInputError,
	setHasInputError,
}) => {
	const accessToken = localStorage.getItem("blueberry-access");
	const inputChangeHandler = (e, index) => {
		setHasInputError(false);
		const newFields = [...fields];
		newFields[index].answer = e.target.value;
		setFields(newFields);
	};
	useEffect(() => {
		const fetchFormFields = async () => {
			const res = await fetch(
				`${BASE_URL}api/event/registration/${slug}/`,
				{
					method: "GET",
					headers: {
						"content-type": "application",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await res.json();
			if (res.ok) {
				setFields(data.fields);
			}
		};
		fetchFormFields();
	}, [accessToken, setFields, slug]);

	return (
		<Box>
			<div className={styles.formBox}>
				{fields.map((field, index) => (
					<div className={styles.inputBox} key={field.filed}>
						<label htmlFor={field.field} className="caption-lg">
							{field.question}{" "}
							<span className={`caption-lg ${styles.essential}`}>
								(ضروری)
							</span>
						</label>
						<Input
							key={field.field}
							id={field.field}
							placeholder={`${field.question} خود را وارد کنید`}
							value={fields.at(index).answer}
							onChange={(e) => inputChangeHandler(e, index)}
						/>
					</div>
				))}
			</div>
			{hasInputError && (
				<ErrorMessage className={styles.error}>
					(ضروری) : مشخصات خواسته شده با برچسب ضروری نمیتواند خالی
					باشد
				</ErrorMessage>
			)}
		</Box>
	);
};

export default SignupForm;
