import styles from "./EventSignupPage.module.css";
import SignupForm from "../components/eventSignup/SignupForm";
import EventItem from "../components/eventSignup/EventItem";
import PaymentBox from "../components/eventSignup/PaymentBox";
import Button from "../components/UI/Button";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import defaultPhoto from "../assets/defaultphoto.svg";
import useUrl from "../hooks/useUrl";
import { fetchEvent, fetchEventSignupFormFields } from "../services/apiEvents";
import { fetchUserBalance } from "../services/apiUser";
import { arrayToObject } from "../utils/funcs";



const EventSignupPage = () => {
	const BASE_URL = useUrl();
	const { event, balance, formFields } = useLoaderData();
	const [fields, setFields] = useState(formFields);
	const [discountCode, setDiscountCode] = useState("");
	const [inputError, setInputError] = useState([]);
	const navigate = useNavigate();
	const [token] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
	const { eventSlug } = useParams();

	const validateInput = () => {
		let hasError = false;
		fields.forEach((field) => {
			switch (field.field) {
				case "personal_id":
					if (field.answer.length !== 10) {
						setInputError((cur) => [...cur, "personal_id"]);
						hasError = true;
					}
					break;
				case "student_id":
					if (field.answer.length < 10 || field.answer.length > 11) {
						setInputError((cur) => [...cur, "student_id"]);
						hasError = true;
					}

					break;
				case "description":
					break;
				default:
					if (field.answer.trim() === "") {
						setInputError((cur) => [...cur, field.field]);
						hasError = true;
					}

					break;
			}
		});
		return hasError;
	};

	const signupHandler = () => {
		const hasErrors = validateInput();
		if (hasErrors) return;
		const sendSignupData = async () => {
			let data = arrayToObject(fields);
			data = discountCode ? { ...data, gift_code: discountCode } : data;
			console.log(data);
			const res = await fetch(
				`${BASE_URL}api/event/registration/${eventSlug}/`,
				{
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const dataa = await res.json();
			if (res.status === 201) {
				navigate(
					`/events/${eventSlug}/signup-success?code=${dataa.short_link}`
				);
			}
			if (res.status === 200) {
				console.log("hello");
				navigate(`/events/${eventSlug}/signup-waiting`);
			}

		};
		sendSignupData();
	};
	

	const {
		name,
		location,
		start_time: startTime,
		poster,
		fee: finalFee,
		initial_fee: initialFee,
	} = event;
	return (
		<div className={`container ${styles.container}`}>
			<h5 className={styles.pageTitle}>اطلاعات فردی</h5>
			<p className={`body-md ${styles.desc}`}>
				با این مشخصات ثبت نام میکنید:
			</p>
			<div className={styles.wrapper}>
				<main>
					<SignupForm
						slug={eventSlug}
						fields={fields}
						setFields={setFields}
						inputError={inputError}
						setInputError={setInputError}
					/>
					<p className={`body-md ${styles.desc} ${styles.eventDesc}`}>
						در این رویداد ثبت نام میکنید:
					</p>
					<EventItem
						name={name}
						location={location}
						startTime={startTime}
						poster={poster || defaultPhoto}
					/>
				</main>

				<aside className={styles.side}>
					<PaymentBox
						fee={finalFee}
						balance={balance}
						slug={eventSlug}
						discountCode={discountCode}
						setDiscountCode={setDiscountCode}
						initialFee={initialFee}
					/>
					<Button type="secondary" onClick={signupHandler}>
						شارژ اعتبار و ثبت نام
					</Button>
				</aside>
			</div>
		</div>
	);
};

export default EventSignupPage;

export const loader = async ({ params }) => {
	const event = await fetchEvent(params.eventSlug);
	const formFields = await fetchEventSignupFormFields(params.eventSlug)
	const balance = await fetchUserBalance()

	return { event, balance, formFields };
};
