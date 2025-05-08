import Box from "../UI/Box";
import Input from "../UI/Input";
import styles from "./SignupForm.module.css";
import ErrorMessage from "../UI/ErrorMessage";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { useEventSignupFields } from "./useEventSignupFields";
import Loader from "../UI/Loader";

interface FieldType {
	field: string;
	question: string;
	answer: string;
}
interface SignupFormProps {
	fields: FieldType[];
	setFields: Dispatch<SetStateAction<FieldType[]>>;
	inputError: string[];
	setInputError: Dispatch<SetStateAction<string[]>>;
	isPending: boolean;
}

const SignupForm = ({
	fields,
	setFields,
	inputError,
	setInputError,
	isPending,
}: SignupFormProps) => {
	const { data: fieldsData, isLoading } = useEventSignupFields();
	useEffect(() => {
		if (fieldsData) {
			setFields(fieldsData.fields);
		}
	}, [fieldsData, setFields]);
	const inputChangeHandler = (
		e: ChangeEvent<HTMLInputElement>,
		index: number,
		field: string
	) => {
		const newErrors = inputError.filter((error) => error !== field);
		setInputError(newErrors);
		const newFields = [...fields];
		newFields[index].answer = e.target.value;
		setFields(newFields);
	};
	
	return (
		<Box>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.formBox}>
					{fields?.map((field, index) => (
						<div className={styles.inputBox} key={field.field}>
							<label htmlFor={field.field} className="caption-lg">
								{field.question}{" "}
								<span
									className={`caption-lg ${styles.essential}`}
								>
									(ضروری)
								</span>
							</label>
							<Input
								key={field.field}
								id={field.field}
								placeholder={`${field.question} خود را وارد کنید`}
								value={fields.at(index)?.answer}
								onChange={(e) =>
									inputChangeHandler(e, index, field.field)
								}
								type={
									field.field === "student_id" ||
									field.field === "personal_id"
										? "number"
										: "text"
								}
								className={
									inputError.includes(field.field)
										? "error"
										: ""
								}
								disabled={isPending}
							/>
							{inputError.includes(field.field) && (
								<ErrorMessage className={styles.error}>
									{field.question} وارد شده نامعتبر است.
								</ErrorMessage>
							)}
						</div>
					))}
				</div>
			)}
		</Box>
	);
};

export default SignupForm;
