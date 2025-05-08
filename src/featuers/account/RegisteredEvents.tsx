import styles from "./RegisteredEvents.module.css";
import EventBox from "../event/EventBox";
import { useNavigate } from "react-router-dom";

interface Status {
	short_link: string;
	details: string;
	status: "CERTIFICATE" | "TICKET" | "WAITING_FOR_PAYMENT" | "ERROR" | "END" | "REG";
}
interface Event {
	slug: string;
	name: string;
	initial_fee: number;
	fee: number;
	start_time: number;
	status: Status;
	banner: string;
}

interface RegisteredEventsProps {
	events: Event[];
}

const RegisteredEvents = ({ events }: RegisteredEventsProps) => {
	const navigate = useNavigate();
	const redirectHandler = (slug: string) => {
		navigate(`/events/${slug}`);
	};
	const doneEvents = events
		?.slice()
		.filter((event) => event.status.status === "CERTIFICATE");
	const curEvents = events
		?.slice()
		.filter(
			(event) =>
				event.status.status === "TICKET" ||
				event.status.status === "WAITING_FOR_PAYMENT"
		);
	return (
		<div className={styles.secContainer}>
			<section className={styles.eventsSection}>
				<h5>رویداد های جدید</h5>
				<div className={styles.events}>
					{curEvents?.map((event) => (
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
					{doneEvents?.map((event) => (
						<EventBox event={event} key={event.slug} />
					))}
				</div>
			</section>
		</div>
	);
};

export default RegisteredEvents;
