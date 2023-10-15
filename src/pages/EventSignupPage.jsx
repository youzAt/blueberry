import styles from "./EventSignupPage.module.css";
import SignupForm from "../components/eventSignup/SignupForm";
import EventItem from "../components/eventSignup/EventItem";
import PaymentBox from "../components/eventSignup/PaymentBox";
import Button from "../components/UI/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultPhoto from "../assets/defaultphoto.png";

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
	const accessToken = localStorage.getItem("blueberry-access");
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
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data = await res.json();
			setBalance(data.balance);
		};
		fetchBalance();
	});
	const signupHandler = () => {
		const sendSignupData = async () => {
			let data = arrayToObject(fields);
			data = discountCode ? {...data, gift_code: discountCode} : data;
			const res = await fetch(
				`${BASE_URL}api/event/registration/${eventSlug}/`,
				{
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(res)
			const dataa = await res.json();
			console.log(dataa)
		};
		sendSignupData();
	};
	const { name, location, start_time: startTime, poster, fee } = event;
	return (
		<div className="container">
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
					/>
					<p className={`body-md ${styles.desc}`}>
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
						fee={fee}
						balance={balance}
						slug={eventSlug}
						discountCode={discountCode}
						setDiscountCode={setDiscountCode}
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
