/* eslint-disable no-mixed-spaces-and-tabs */
import { useParams } from "react-router-dom";
import { useEvent } from "../featuers/event/useEvent";
import { useNextUrl } from "../context/NextUrlProvider";
import styles from "./Event.module.css";
import EventBanner from "../featuers/event/EventBanner";
import EventDescription from "../featuers/event/EventDescription";
import Box from "../featuers/UI/Box";
import GetEventTicket from "../featuers/event/GetEventTicket";
import GetEventCertificate from "../featuers/event/GetEventCertificate";
import EventSignup from "../featuers/event/EventSignup";
import WaitPayment from "../featuers/event/WaitPayment";
import EventDates from "../featuers/event/EventDates";
import EventPoster from "../featuers/event/EventPoster";
import ShortLink from "../featuers/event/ShortLink";
import defaultPhoto from "../assets/defaultphoto.svg";
import Loader from "../featuers/UI/Loader";

const Event = () => {
	const { eventSlug } = useParams();
	const { setNextUrl } = useNextUrl()!;
	const { data: event, isLoading } = useEvent();
	const {
		initial_fee: initialFee = 0,
		fee: finalFee = 0,
		reg_time: regTime = 0,
		start_time: startTime = 0,
		end_time: endTime = 0,
		name = "",
		status,
		description = "",
		poster = "",
		banner = "",
		short_link: link = "",
	} = event || {};

	document.title = "Blue Berry | Event - " + (name || "");

	if (isLoading) {
		return <Loader />;
	}

	return (
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
							slug={eventSlug || ""}
							initialFee={initialFee}
							finalFee={finalFee}
						/>
					)}
					{status?.status === "WAITING_FOR_PAYMENT" && (
						<WaitPayment slug={eventSlug || ""} />
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
	);
};

export default Event;
