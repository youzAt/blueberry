/* eslint-disable no-mixed-spaces-and-tabs */
import styles from "./EventsPage.module.css";
import EventBox from "../components/event/EventBox";
import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useNextUrl } from "../context/NextUrlProvider";
import { sortEventList } from "../utils/funcs";
import { fetchAllEvents } from "../services/apiEvents";

const EventsPage = () => {
	const { setNextUrl } = useNextUrl();
	const navigate = useNavigate();
	const events = useLoaderData();

	const redirectHandler = (slug) => {
		navigate(`./${slug}`);
	};
	const doneEvents = events
		.slice()
		.filter((event) => event.status.status === "END");
	const curEvents = sortEventList(events)
		.slice()
		.filter((event) => event.status.status !== "END");
	return (
		<>
			<MainHeader removeMenu />
			<main className={`container ${styles.container}`}>
				{curEvents.length !== 0 && (
					<section className={styles.eventsSection}>
						<h5>تازه ترین رویداد ها</h5>
						<div className={styles.events}>
							{curEvents.map((event) => (
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
						{doneEvents.map((event) => (
							<EventBox
								onClick={() => redirectHandler(event.slug)}
								event={event}
								key={event.slug}
							/>
						))}
					</div>
				</section>
			</main>
			<MainFooter />
		</>
	);
};

export default EventsPage;

export const loader = async () => {
	const events = await fetchAllEvents();
	return events;
};
