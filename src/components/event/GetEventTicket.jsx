import Box from "../UI/Box";
import Button from "../UI/Button";
import ticketIcon from '../../assets/icons/ticket.svg'
import styles from "./GetEventTicket.module.css";
const GetEventTicket = () => {
	return (
		<Box className={styles.ticketBox}>
			<p className="caption-lg">شما در این رویداد ثبت نام کرده اید</p>
            <Button>
                <img src={ticketIcon} alt="ticket icon" />دریافت بلیت</Button>
		</Box>
	);
};

export default GetEventTicket;
