import styles from "./EventSignupPage.module.css";
import SignupForm from "../components/eventSignup/SignupForm";
import EventItem from "../components/eventSignup/EventItem";
import PaymentBox from "../components/eventSignup/PaymentBox";
import Button from "../components/UI/Button";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultPhoto from "../assets/defaultphoto.svg";
import getAccess from "../funcs/getAccess";

const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";
function arrayToObject(array) {
	return array.reduce((acc, item) => {
		acc[item.field] = item.answer;
		return acc;
	}, {});
}

const EventSignupPage = () => {
	const [event, setEvent] = useState({});
	const [balance, setBalance] = useState("");
	const [fields, setFields] = useState([]);
	const [discountCode, setDiscountCode] = useState("");
	const [hasInputError, setHasInputError] = useState(false);
	const navigate = useNavigate();
	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
	const { eventSlug } = useParams();
	useEffect(() => {
		const fetchEvents = async () => {
			const res = await fetch(`${BASE_URL}api/events/${eventSlug}/ `);
			const data = await res.json();
			setEvent(data);
		};
		fetchEvents();
	}, [eventSlug]);

	useEffect(() => {
		const fetchBalance = async () => {
			const res = await fetch(`${BASE_URL}api/payment/balance/`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			if (!res.ok) {
				getAccess(setToken);
			} else {
				setBalance(data.balance);
			}
		};
		fetchBalance();
	}, [token]);
	const validateInput = () => {
		const valid = fields.some((field) => {
			if (field.field !== "description") {
				if (field.answer.trim() === "") {
					setHasInputError(() => true);
					return true;
				}
			}
		});
		return !valid;
	};

	const signupHandler = () => {
		if (!validateInput()) return;
		const sendSignupData = async () => {
			let data = arrayToObject(fields);
			data = discountCode ? { ...data, gift_code: discountCode } : data;
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
			const resData = await res.json();
			if (res.ok) {
				navigate(`/events/${eventSlug}/signup-success`);
			}
			console.log(res);
			console.log(resData);
		};
		sendSignupData();
	};
	useEffect(() => {
		const fetchFormFields = async () => {
			const res = await fetch(
				`${BASE_URL}api/event/registration/${eventSlug}/`,
				{
					method: "GET",
					headers: {
						"content-type": "application",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await res.json();
			if (res.ok) {
				setFields(data.fields);
			} else {
				navigate(`/events/${eventSlug}`);
			}
		};
		fetchFormFields();
	}, [setFields, token, eventSlug, navigate]);

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
						hasInputError={hasInputError}
						setHasInputError={setHasInputError}
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
