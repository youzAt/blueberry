import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import styles from "./MyEventPage.module.css";
import { useEffect, useState } from "react";
import getAccess from "../funcs/getAccess";
import useUrl from "../hooks/useUrl";
import Loader from "../components/UI/Loader";
import RegisteredEvents from "../components/account/RegisteredEvents";
const MyEventPage = () => {
	const navigate = useNavigate();
	const BASE_URL = useUrl();
	const [isLoading, setIsLoading] = useState(false);
	const [events, setEvents] = useState([]);
	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});

	useEffect(() => {
		const fetchEvents = async () => {
			setIsLoading(true);

			const res = await fetch(BASE_URL + "api/events/me/", {
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
				setEvents(data);
			}
			setIsLoading(false);
		};
		fetchEvents();
	}, [token, BASE_URL]);
	const redirectHandler = () => {
		navigate("/events");
	};
	if (isLoading) return <Loader />;
	if (events.length === 0) {
		return (
			<div className={styles.noEvents}>
				<h5>هنوز در رویدادی شرکت نکردید</h5>
				<p className="body-lg">
					با مشاهده رویداد ها در جریان آخرین رویداد های بلوبری باشید
				</p>
				<Button onClick={redirectHandler}>مشاهده رویداد ها</Button>
			</div>
		);
	}
	return <RegisteredEvents events={events}/>
};

export default MyEventPage;
