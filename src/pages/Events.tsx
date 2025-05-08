import styles from "./Events.module.css";
import { useNavigate } from "react-router-dom";
import { sortEventList } from "../utils/helpers";
import { useNextUrl } from "../context/NextUrlProvider";
import { useAllEvents } from "../featuers/event/useAllEvents";
import EventBox from "../featuers/event/EventBox";
import Loader from "../featuers/UI/Loader";

const Events = () => {
	document.title = "Blue Berry | Events";
	const navigate = useNavigate();
	const { setNextUrl } = useNextUrl()!;
	const { data: events, isLoading } = useAllEvents();

	const redirectHandler = (slug: string) => {
		navigate(`./${slug}`);
	};

	const doneEvents = events
		? sortEventList(events)
				?.slice()
				.filter(
					(event) =>
						event.status.status === "END" ||
						event.status.status === "CERTIFICATE"
				)
		: [];
	const curEvents = events
		? sortEventList(events)
				?.slice()
				.filter(
					(event) =>
						event.status.status !== "END" &&
						event.status.status !== "CERTIFICATE"
				)
		: [];
	if (isLoading) {
		return <Loader />;
	}
	return (
		<div className={`container ${styles.container}`}>
			{curEvents.length !== 0 && (
				<section className={styles.eventsSection}>
					<h5>تازه ترین رویداد ها</h5>
					<div className={styles.events}>
						{curEvents?.map((event) => (
							<EventBox
								setNextUrl={setNextUrl}
								onClick={() => redirectHandler(event.slug)}
								event={event}
								key={event.slug}
							/>
						))}
					</div>
				</section>
			)}
			<section className={styles.eventsSection}>
				<h5>رویداد های برگزار شده</h5>
				<div className={styles.events}>
					{doneEvents?.map((event) => (
						<EventBox
							onClick={() => redirectHandler(event.slug)}
							event={event}
							key={event.slug}
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default Events;
