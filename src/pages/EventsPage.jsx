import { useEffect, useState } from "react";
import EventBox from "../components/event/EventBox";
import styles from "./EventsPage.module.css";
import MainHeader from "../components/MainHeader";
import getAccess from "../funcs/getAccess";
import MainFooter from "../components/MainFooter";

const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";
const EventsPage = () => {
	const [events, setEvents] = useState([]);

	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
	
	useEffect(() => {
		const fetchEvents = async () => {
			const reqHeader = token
				? {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
				}
				: {
						"content-type": "application/json",
				};

			const res = await fetch(BASE_URL + "api/events/", {
				method: "GET",
				headers: reqHeader,
			});
			const data = await res.json();
			if (!res.ok) {
				getAccess(setToken);
			} else {
				setEvents(data);
			}
		};
		fetchEvents();
	}, [token]);
	const doneEvents = events
		.slice()
		.filter((event) => event.status.status === "END");
	const curEvents = events
		.slice()
		.filter((event) => event.status.status !== "END");
	return (
		<>
			<MainHeader />
			<main className="container">
				<section className={styles.eventsSection}>
					<h5>رویداد های جدید</h5>
					<div className={styles.events}>
						{curEvents.map((event) => (
							<EventBox event={event} key={event.slug} />
						))}
					</div>
				</section>
				<section className={styles.eventsSection}>
					<h5>رویداد های برگزار شده</h5>
					<div className={styles.events}>
						{doneEvents.map((event) => (
							<EventBox event={event} key={event.slug} />
						))}
					</div>
				</section>
			</main>
			<MainFooter />
		</>
	);
};

export default EventsPage;
