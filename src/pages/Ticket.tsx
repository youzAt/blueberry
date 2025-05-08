import styles from "./Ticket.module.css";
import shareIcon from "../assets/icons/share.svg";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useTicketInfo } from "../featuers/ticket/useTicketInfo";
import TicketWarning from "../featuers/ticket/TicketWarning";
import Button from "../featuers/UI/Button";
import TicketComponent from "../featuers/ticket/Ticket";
import Loader from "../featuers/UI/Loader";

const Ticket = () => {
	const { data: ticketInfo, isLoading } = useTicketInfo();
	const ticketRef = useRef<HTMLElement>(null);
	const printTicketHandler = useReactToPrint({
		contentRef: ticketRef,
	});
	if(isLoading) return <Loader/>
	document.title = "Blue Berry | Ticket - " + (ticketInfo?.event?.name || "");

	return (
		<main className={`${styles.ticketPage} container`} ref={ticketRef}>
			<h5>چاپ بلیط</h5>
			{ticketInfo?.event?.ticket_warnings.length !== 0 && (
				<TicketWarning
					warningDetails={ticketInfo?.event?.ticket_warnings}
				/>
			)}
			<TicketComponent info={ticketInfo} />
			<div className={styles.btns}>
				<Button onClick={() => printTicketHandler()}>پرینت بلیت</Button>
				<Button type="outline">
					<img src={shareIcon} alt="share icon" />
					اشتراک گذاری
				</Button>
			</div>
		</main>
	);
};

export default Ticket;
