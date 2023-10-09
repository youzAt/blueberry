import Box from "../UI/Box";
import calendarIcon from "../../assets/icons/calendar.svg";
import timerIcon from "../../assets/icons/timer.svg";
import styles from "./EventDates.module.css";
import moment from "moment-jalaali";

function convertUnixToPersianWeekDate(unixTimestamp) {
	const date = new Date(unixTimestamp * 1000);
	moment.loadPersian({ dialect: "persian-modern" });
	const persianDate = moment(date).format("dddd jD jMMMM jYYYY", "fa");

	return persianDate;
}
convertUnixToPersianWeekDate(1696612353);
const EventDates = ({ regTime, startTime, endTime }) => {
	return (
		<Box className={styles.dates}>
			<div className={styles.dateItem}>
				<img src={timerIcon} alt="timer icon" />
				<div className={`body-md ${styles.date}`}>
					<p>زمان پایان ثبت نام</p>
					<span>{convertUnixToPersianWeekDate(regTime)}</span>
				</div>
			</div>
			<div className={styles.dateItem}>
				<img src={calendarIcon} alt="timer icon" />
				<div className={`body-md ${styles.date}`}>
					<p>شروع دوره</p>
					<span>{convertUnixToPersianWeekDate(startTime)}</span>
				</div>
			</div>
			<div className={styles.dateItem}>
				<img src={calendarIcon} alt="timer icon" />
				<div className={`body-md ${styles.date}`}>
					<p>زمان پایان دوره</p>
					<span>{convertUnixToPersianWeekDate(endTime)}</span>
				</div>
			</div>
		</Box>
	);
};

export default EventDates;
