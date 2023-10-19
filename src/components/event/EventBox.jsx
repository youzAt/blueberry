import styles from "./EventBox.module.css";
import moment from "moment-jalaali";
import fa from "moment/src/locale/fa";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import defaultPhoto from "../../assets/defaultphoto.svg";
import certificateIcon from "../../assets/icons/award2.svg";
import ticketIcon from "../../assets/icons/ticket2.svg";

moment.locale("fa", fa);
moment.loadPersian();

const persianSeqNums = ["اول", "دوم", "سوم", "چهارم"];

function convertUnixToPersianWeekDate(unixTimestamp) {
	const date = new Date(unixTimestamp * 1000);
	const week = moment(date).jWeek() % 4;
	const month = moment(date).format("jMMMM");
	const convertedDate = {
		week,
		month,
	};

	return convertedDate;
}
const EventBox = ({ event }) => {
	const navigate = useNavigate();
	const {
		slug,
		name: title,
		initial_fee: initialFee,
		fee: finalFee,
		start_time: startTime,
		status,
		banner,
	} = event;
	const { week, month } = convertUnixToPersianWeekDate(startTime);

	const redirectHandler = () => {
		navigate(`./${slug}`);
	};
	const eventAction = (
		<div className={styles.eventAction}>
			<Button
				type="outline"
				isSmall
				className={styles.signUpBtn}
				onClick={redirectHandler}
			>
				خرید بلیت
			</Button>
			<div className={styles.price}>
				{initialFee && (
					<p className="caption-lg">
						<s> {initialFee.toLocaleString()} </s>
						ءتءء
					</p>
				)}
				<p className="caption-lg">
					{finalFee !== 0 ? (
						<>
							<span> {finalFee.toLocaleString()} </span>
							ءتءء
						</>
					) : (
						<span>رایگان</span>
					)}
				</p>
			</div>
		</div>
	);
	const error =
		status.status !== "ERROR" && status.status !== "END" ? null : (
			<Button
				isSmall
				type="tertiary"
				className={`deactive ${styles.error}`}
			>
				{status.details}
			</Button>
		);
	const certificate =
		status.status !== "CERTIFICATE" ? null : (
			<Button type="outline" isSmall className={styles.outBtn}>
				<img src={certificateIcon} alt="certificate icon" />
				دریافت گواهی
			</Button>
		);
	const ticket =
		status.status !== "TICKET" ? null : (
			<Button type="outline" isSmall className={styles.outBtn}>
				<img src={ticketIcon} alt="ticket icon" />
				دریافت بلیت
			</Button>
		);
	return (
		<div className={`${styles.eventBox} ${error && "deactive"}`}>
			<div className={styles.eventBanner}>
				<img src={banner || defaultPhoto} />
			</div>
			<div className={styles.eventDetails}>
				<span className={`caption-md ${styles.eventDate}`}>
					{`هفته ${persianSeqNums.at(week)} ${month}`}
				</span>
				<h6 onClick={redirectHandler}>{title}</h6>

				{error || certificate || ticket || eventAction}
			</div>
		</div>
	);
};

export default EventBox;
