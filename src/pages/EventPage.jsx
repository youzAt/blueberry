import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./EventPage.module.css";
import EventBanner from "../components/event/EventBanner";
import EventDescription from "../components/event/EventDescription";
import MainHeader from "../components/layout/MainHeader";
import EventSignup from "../components/event/EventSignup";
import EventDates from "../components/event/EventDates";
// import EventPoster from "../components/event/EventPoster";
import GetEventTicket from "../components/event/GetEventTicket";
import GetEventCertificate from "../components/event/GetEventCertificate";
import Box from "../components/UI/Box";
import defaultPhoto from "../assets/defaultphoto.svg";
import getAccess from "../funcs/getAccess";
import MainFooter from "../components/layout/MainFooter";
import useUrl from "../hooks/useUrl";
import ShortLink from "../components/event/ShortLink";
import Loader from "../components/UI/Loader";

const EventPage = ({ setNextUrl }) => {
	const navigate = useNavigate();
	const [event, setEvent] = useState({});
	const [isLoading, setIsLoaing] = useState(false);
	const { eventSlug } = useParams();
	const BASE_URL = useUrl();
	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});

	useEffect(() => {
		const fetchEvents = async () => {
			setIsLoaing(true);
			const reqHeader = token
				? {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
				}
				: {
						"content-type": "application/json",
				};

			const res = await fetch(`${BASE_URL}api/events/${eventSlug}/`, {
				method: "GET",
				headers: reqHeader,
			});
			const data = await res.json();
			if (!res.ok && res.status === 401) {
				getAccess(setToken);
			} else if (!res.ok && res.status === 404) {
				navigate("/event-not-fount");
			} else {
				setEvent(data);
			}
			setIsLoaing(false);
		};
		fetchEvents();
	}, [eventSlug, token, navigate, BASE_URL]);

	const {
		initial_fee: initialFee,
		fee: finalFee,
		reg_time: regTime,
		start_time: startTime,
		end_time: endTime,
		name,
		status,
		description,
		// poster,
		banner,
		short_link: link,
	} = event;
	return (
		<>
			<MainHeader removeMenu/>

			<div className={`container ${styles.container}`}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<h3>{name}</h3>
						<div className={styles.wrapper}>
							<main className={styles.mainContent}>
								<EventBanner
									src={banner || defaultPhoto}
									name={name}
								/>
								<EventDescription>
									{description}
								</EventDescription>
							</main>
							<aside className={styles.sideContent}>
								{(status?.status === "END" ||
									status?.status === "ERROR") && (
									<Box className={styles.endEvent}>
										<p
											className={`caption-lg ${styles.end}`}
										>
											{status.details}
										</p>
									</Box>
								)}
								{status?.status === "TICKET" && (
									<GetEventTicket />
								)}
								{status?.status === "CERTIFICATE" && (
									<GetEventCertificate />
								)}
								{status?.status === "REG" && (
									<EventSignup
										setNextUrl={setNextUrl}
										slug={eventSlug}
										initialFee={initialFee}
										finalFee={finalFee}
									/>
								)}
								<EventDates
									regTime={regTime}
									startTime={startTime}
									endTime={endTime}
								/>
								{/* <EventPoster name={name} src={poster || defaultPhoto} /> */}
								<ShortLink link={link} />
							</aside>
						</div>
					</>
				)}
			</div>

			<MainFooter />
		</>
	);
};

export default EventPage;
