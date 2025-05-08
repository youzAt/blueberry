import Box from "../UI/Box";
import Button from "../UI/Button";
import ticketIcon from "../../assets/icons/ticket.svg";
import styles from "./GetEventTicket.module.css";
import { useNavigate } from "react-router-dom";
const GetEventTicket = () => {
	const navigate = useNavigate();
	const redirectHandler = () => {
		navigate("./ticket");
	};
	return (
		<Box className={styles.ticketBox}>
			<p className="caption-lg">شما در این رویداد ثبت نام کرده اید</p>
			<Button onClick={redirectHandler}>
				<img src={ticketIcon} alt="ticket icon" />
				دریافت بلیت
			</Button>
		</Box>
	);
};

export default GetEventTicket;
