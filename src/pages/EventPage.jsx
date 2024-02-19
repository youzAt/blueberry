/* eslint-disable no-mixed-spaces-and-tabs */
import { useLoaderData, useParams } from "react-router-dom";
import styles from "./EventPage.module.css";
import EventBanner from "../components/event/EventBanner";
import EventDescription from "../components/event/EventDescription";
import MainHeader from "../components/layout/MainHeader";
import EventSignup from "../components/event/EventSignup";
import EventDates from "../components/event/EventDates";
import EventPoster from "../components/event/EventPoster";
import GetEventTicket from "../components/event/GetEventTicket";
import GetEventCertificate from "../components/event/GetEventCertificate";
import Box from "../components/UI/Box";
import defaultPhoto from "../assets/defaultphoto.svg";
import MainFooter from "../components/layout/MainFooter";
import ShortLink from "../components/event/ShortLink";
import WaitPayment from "../components/event/WaitPayment";
import { useNextUrl } from "../context/NextUrlProvider";
import { fetchEvent } from "../services/apiEvents";

const EventPage = () => {
	const { setNextUrl } = useNextUrl();
	const { eventSlug } = useParams();
	const event = useLoaderData();

	const {
		initial_fee: initialFee,
		fee: finalFee,
		reg_time: regTime,
		start_time: startTime,
		end_time: endTime,
		name,
		status,
		description,
		poster,
		banner,
		short_link: link,
	} = event;
	return (
		<>
			<MainHeader removeMenu />

			<div className={`container ${styles.container}`}>
				<h3>{name}</h3>
				<div className={styles.wrapper}>
					<main className={styles.mainContent}>
						<EventBanner src={banner || defaultPhoto} name={name} />
						<EventDescription>{description}</EventDescription>
					</main>
					<aside className={styles.sideContent}>
						{(status?.status === "END" ||
							status?.status === "ERROR") && (
							<Box className={styles.endEvent}>
								<p className={`caption-lg ${styles.end}`}>
									{status.details}
								</p>
							</Box>
						)}
						{status?.status === "TICKET" && <GetEventTicket />}
						{status?.status === "CERTIFICATE" && (
							<GetEventCertificate cerId={status.short_link} />
						)}
						{status?.status === "REG" && (
							<EventSignup
								setNextUrl={setNextUrl}
								slug={eventSlug}
								initialFee={initialFee}
								finalFee={finalFee}
							/>
						)}
						{status?.status === "WAITING_FOR_PAYMENT" && (
							<WaitPayment slug={eventSlug} />
						)}
						<EventDates
							regTime={regTime}
							startTime={startTime}
							endTime={endTime}
						/>
						<EventPoster name={name} src={poster || defaultPhoto} />
						<ShortLink link={link} />
					</aside>
				</div>
			</div>

			<MainFooter className={styles.footer} />
		</>
	);
};

export default EventPage;

export const loader = async ({ params }) => {
	const event = await fetchEvent(params.eventSlug);
	return event;
};
