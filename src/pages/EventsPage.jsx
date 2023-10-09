import { useEffect, useState } from "react";
import EventBox from "../components/event/EventBox";
import styles from "./EventsPage.module.css";
import EventBanner from "../components/event/EventBanner";
import MainHeader from "../components/MainHeader";

const BASE_URL = "http://127.0.0.1:8000/";
const EventsPage = () => {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		const fetchEvents = async () => {
			const res = await fetch(BASE_URL + "api/events/");
			const data = await res.json();
			console.log(data);
			setEvents(data);
		};
		fetchEvents();
	}, []);
	return (
		<>
			<MainHeader />
			<main className="container">
				<section className={styles.eventsSection}>
					<h5>رویداد های جدید</h5>
					<div className={styles.events}>
						{events.map((event) => (
							<EventBox event={event} key={event.slug} />
						))}
					</div>
				</section>
				<section className={styles.eventsSection}>
					<h5>رویداد های برگزار شده</h5>
					<div className={styles.events}>
						
					</div>
				</section>
			</main>
		</>
	);
};

export default EventsPage;
