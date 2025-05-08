import styles from "./TicketWarning.module.css";
import Box from "../UI/Box";
interface TicketWarningProps {
	warningDetails: {
		title: string;
		button_link: string;
		button_text: string;
		text: string;
	}[];
}
const TicketWarning = ({ warningDetails }: TicketWarningProps) => {
	const detail = warningDetails?.at(0);
	return (
		<Box className={styles.warning}>
			<h6>{detail?.title}</h6>
			<p className={`body-sm`}>{detail?.text}</p>
			<a
				href={detail?.button_link}
				className={`${styles.btn} button-sm`}
			>
				{detail?.button_text}
			</a>
		</Box>
	);
};

export default TicketWarning;
