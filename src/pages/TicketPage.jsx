import styles from "./TicketPage.module.css";
import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import Button from "../components/UI/Button";
import Ticket from "../components/ticket/Ticket";
import shareIcon from "../assets/icons/share.svg";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
const TicketPage = () => {
	const ticketRef = useRef();
	const printTicketHandler = useReactToPrint({
		content:()=> ticketRef.current,
	});
	return (
		<>
			<MainHeader />
			<main className={styles.ticketPage} ref={ticketRef}>
				<h5>چاپ بلیط</h5>
				<Ticket  />
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
