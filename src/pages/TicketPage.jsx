import styles from "./TicketPage.module.css";
import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import Button from "../components/UI/Button";
import Ticket from "../components/ticket/Ticket";
import shareIcon from "../assets/icons/share.svg";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import useUrl from "../hooks/useUrl";
import getAccess from "../funcs/getAccess";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
	const BASE_URL = useUrl();
	const [ticketInfo, setTicketInfo] = useState({});
	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
	const navigate = useNavigate();
	const eventSlug = window.location.pathname.split("/").at(-2);

	useEffect(() => {
		const fetchEvents = async () => {
			// setIsLoaing(true);

			const res = await fetch(
				`${BASE_URL}api/event/ticket/${eventSlug}/`,
				{
					method: "GET",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await res.json();
			if (!res.ok && res.status === 401) {
				getAccess(setToken);
			} else if (!res.ok && res.status === 404) {
				navigate("/event-not-fount");
			} else {
				setTicketInfo(data);
				console.log(data);
			}
			// setIsLoaing(false);
		};
		fetchEvents();
	}, [eventSlug, token, navigate, BASE_URL]);

	const ticketRef = useRef();
	const printTicketHandler = useReactToPrint({
		content: () => ticketRef.current,
	});
	return (
		<>
			<MainHeader removeMenu/>
			<main className={styles.ticketPage} ref={ticketRef}>
				<h5>چاپ بلیط</h5>
				<Ticket info={ticketInfo} />
				<div className={styles.btns}>
					<Button onClick={printTicketHandler}>پرینت بلیت</Button>
					<Button type="outline">
						<img src={shareIcon} alt="share icon" />
						اشتراک گذاری
					</Button>
				</div>
			</main>
			<MainFooter />
		</>
	);
};

export default TicketPage;
