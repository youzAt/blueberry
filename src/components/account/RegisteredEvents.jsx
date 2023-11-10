import styles from "./RegisteredEvents.module.css";
import EventBox from "../event/EventBox";
import { useNavigate } from "react-router-dom";

const RegisteredEvents = ({ events }) => {
	const navigate = useNavigate();
	const redirectHandler = (slug) => {
		navigate(`/events/${slug}`);
	};
	const doneEvents = events
		.slice()
		.filter((event) => event.status.status === "CERTIFICATE");
	const curEvents = events
		.slice()
		.filter((event) => event.status.status === "TICKET");
	return (
		<div>
			<section className={styles.eventsSection}>
				<h5>رویداد های جدید</h5>
				<div className={styles.events}>
					{curEvents.map((event) => (
						<EventBox
							onClick={() => redirectHandler(event.slug)}
							event={event}
							key={event.slug}
						/>
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
		</div>
	);
};

export default RegisteredEvents;
