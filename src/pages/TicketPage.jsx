import styles from "./TicketPage.module.css";
import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import Button from "../components/UI/Button";
import Ticket from "../components/ticket/Ticket";
import shareIcon from "../assets/icons/share.svg";
const TicketPage = () => {
	return (
		<>
			<MainHeader />
			<main className={styles.ticketPage}>
				<h5>چاپ بلیط</h5>
				<Ticket />
				<div className={styles.btns}>
					<Button>پرینت بلیت</Button>
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
