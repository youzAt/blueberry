import styles from "./TicketPage.module.css";
import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import Button from "../components/UI/Button";
import Ticket from "../components/ticket/Ticket";
import shareIcon from "../assets/icons/share.svg";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import TicketWarning from "../components/ticket/TicketWarning";
import { fetchTicketInfo } from "../services/apiEvents";

const TicketPage = () => {
	const ticketInfo = useLoaderData();

	const ticketRef = useRef();
	const printTicketHandler = useReactToPrint({
		content: () => ticketRef.current,
	});
	return (
		<>
			<MainHeader removeMenu />
			<main className={`${styles.ticketPage} container`} ref={ticketRef}>
				<h5>چاپ بلیط</h5>
				{ticketInfo?.event?.ticket_warnings.length !== 0 && (
					<TicketWarning
						warningDetails={ticketInfo?.event?.ticket_warnings}
					/>
				)}
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

export const loader = async ({params}) => {
	const ticketInfo = await fetchTicketInfo(params.eventSlug);

	return ticketInfo;
};
