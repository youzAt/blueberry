import styles from "./EventSignup.module.css";
import { useState } from "react";
import SignupForm from "../featuers/eventsignup/SignupForm";
import EventItem from "../featuers/eventsignup/EventItem";
import PaymentBox from "../featuers/eventsignup/PaymentBox";
import Button from "../featuers/UI/Button";
import { arrayToObject, validateSignupFields } from "../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useSignup } from "../featuers/eventsignup/useSignup";
import { ClipLoader } from "react-spinners";

interface FieldType {
	field: string | "personal_id" | "student_id" | "description";
	question: string;
	answer: string;
}
const initialField: FieldType = {
	field: "",
	question: "",
	answer: "",
};

const EventSignupPage = () => {
	const navigate = useNavigate();
	const { eventSlug } = useParams();
	const { mutate: signup, isPending } = useSignup();
	const [fields, setFields] = useState<FieldType[]>([{ ...initialField }]);
	const [discountCode, setDiscountCode] = useState("");
	const [inputError, setInputError] = useState([""]);

	const signupHandler = () => {
		const hasErrors = validateSignupFields(fields, setInputError);
		if (hasErrors) return;
		let data = arrayToObject(fields);
		data = discountCode ? { ...data, gift_code: discountCode } : data;
		signup(data, {
			onSuccess: (data) => {
				
				if ("short_link" in data) {
					navigate(
						`/events/${eventSlug}/signup-success?code=${data.short_link}`
					);
				} else if ("details" in data) {
					navigate(`/events/${eventSlug}/signup-waiting`);
				}
			},
		});
	};

	return (
		<div className={`container ${styles.container}`}>
			<h5 className={styles.pageTitle}>اطلاعات فردی</h5>
			<p className={`body-md ${styles.desc}`}>
				با این مشخصات ثبت نام میکنید:
			</p>
			<div className={styles.wrapper}>
				<div className={styles.main}>
					<SignupForm
						isPending={isPending}
						inputError={inputError}
						setInputError={setInputError}
						fields={fields}
						setFields={setFields}
					/>
					<p className={`body-md ${styles.desc} ${styles.eventDesc}`}>
						در این رویداد ثبت نام میکنید:
					</p>
					<EventItem />
				</div>
				<aside className={styles.side}>
					<PaymentBox
						discountCode={discountCode}
						setDiscountCode={setDiscountCode}
						isPending={isPending}
					/>
					<Button
						disabled={isPending}
						type="secondary"
						onClick={signupHandler}
					>
						{isPending ? (
							<ClipLoader size={25} />
						) : (
							"شارژ اعتبار و ثبت نام"
						)}
					</Button>
				</aside>
			</div>
		</div>
	);
};

export default EventSignupPage;
