import { useParams } from "react-router-dom";
import styles from "./EventPage.module.css";
import { useEffect, useState } from "react";
import EventBanner from "../components/event/EventBanner";
import EventDescription from "../components/event/EventDescription";
import MainHeader from "../components/MainHeader";
import EventSignup from "../components/event/EventSignup";
import EventDates from "../components/event/EventDates";
import EventPoster from "../components/event/EventPoster";

const BASE_URL = "http://127.0.0.1:8000/";

const EventPage = () => {
	const [event, setEvent] = useState({});
	const { eventSlug } = useParams();
	useEffect(() => {
		const fetchEvents = async () => {
			const res = await fetch(`${BASE_URL}api/events/${eventSlug}/ `);
			const data = await res.json();
			console.log(data);
			setEvent(data);
		};
		fetchEvents();
	}, [eventSlug]);

	const {
		initial_fee: initialFee,
		fee: finalFee,
		reg_time: regTime,
		start_time: startTime,
		end_time: endTime,
		name,
		status,
		description,
	} = event;

	return (
		<>
			<MainHeader />
			<div className="container">
				<h3>{name}</h3>
				<div className={styles.wrapper}>
					<main className={styles.mainContent}>
						<EventBanner
							src="https://www.techrepublic.com/wp-content/uploads/2023/07/tr71123-ai-art.jpeg"
							name={name}
						/>
						<EventDescription>{description}</EventDescription>
					</main>
					<aside className={styles.sideContent}>
						<EventSignup
							initialFee={initialFee}
							finalFee={finalFee}
						/>
						<EventDates
							regTime={regTime}
							startTime={startTime}
							endTime={endTime}
						/>
						<EventPoster
							name={name}
							src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artificial-intelligence-poster-design-template-d34f88114be88ff24c1e62af96f06c76_screen.jpg?ts=1686030593"
						/>
					</aside>
				</div>
			</div>
		</>
	);
};

export default EventPage;
