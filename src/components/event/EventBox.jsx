import styles from "./EventBox.module.css";
import moment from "moment-jalaali";
import fa from "moment/src/locale/fa";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

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
	} = event;
	const { week, month } = convertUnixToPersianWeekDate(startTime);

	const redirectHandler = () => {
		navigate(`./${slug}`);
	};
	const eventAction = (
		<div className={styles.eventAction}>
			<Button type="outline" isSmall className={styles.signUpBtn}>
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
		status.status !== "ERROR" ? null : (
			<Button
				isSmall
				type="tertiary"
				className={`deactive ${styles.error}`}
			>
				{status.details}
			</Button>
		);
	return (
		<div className={`${styles.eventBox} ${error && "deactive"}`}>
			<div className={styles.eventBanner}>
				<img src="https://static.invenglobal.com/upload/image/2020/05/11/o1589232897513893.jpeg" />
			</div>
			<div className={styles.eventDetails}>
				<span className={`caption-md ${styles.eventDate}`}>
					{`هفته ${persianSeqNums.at(week)} ${month}`}
				</span>
				<h6 onClick={redirectHandler}>{title}</h6>

				{error || eventAction}
			</div>
		</div>
	);
};

export default EventBox;
