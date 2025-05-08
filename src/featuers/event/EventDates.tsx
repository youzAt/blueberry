import Box from "../UI/Box";
import calendarIcon from "../../assets/icons/calendar.svg";
import timerIcon from "../../assets/icons/timer.svg";
import styles from "./EventDates.module.css";
import { convertUnixToPersianHourDate } from "../../utils/helpers";

interface EventDatesProps {
	regTime: number;
	startTime: number;
	endTime: number;
}
const EventDates = ({ regTime, startTime, endTime }: EventDatesProps) => {
	return (
		<Box className={styles.dates}>
			<div className={styles.dateItem}>
				<img src={timerIcon} alt="timer icon" />
				<div className={`body-md ${styles.date}`}>
					<p>زمان پایان ثبت نام</p>
					<span>
						{convertUnixToPersianHourDate(regTime).data} --- ساعت{" "}
						{convertUnixToPersianHourDate(regTime).hour}
					</span>
				</div>
			</div>
			<div className={styles.dateItem}>
				<img src={calendarIcon} alt="timer icon" />
				<div className={`body-md ${styles.date}`}>
					<p>شروع دوره</p>
					<span>
						{convertUnixToPersianHourDate(startTime).data} --- ساعت{" "}
						{convertUnixToPersianHourDate(startTime).hour}
					</span>
				</div>
			</div>
			<div className={styles.dateItem}>
				<img src={calendarIcon} alt="timer icon" />
				<div className={`body-md ${styles.date}`}>
					<p>زمان پایان دوره</p>
					<span>
						{convertUnixToPersianHourDate(endTime).data} --- ساعت{" "}
						{convertUnixToPersianHourDate(endTime).hour}
					</span>
				</div>
			</div>
		</Box>
	);
};

export default EventDates;
