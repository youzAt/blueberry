import Box from "../UI/Box";
import styles from "./EventItem.module.css";
import moment from "moment-jalaali";

function convertUnixToPersianWeekDate(unixTimestamp) {
	const date = new Date(unixTimestamp * 1000);
	moment.loadPersian({ dialect: "persian-modern" });
	const persianDate = moment(date).format("dddd jD jMMMM jYYYY", "fa");

	return persianDate;
}
const EventItem = ({ name, location, startTime, poster }) => {
	return (
		<Box className={styles.eventItemBox}>
			<div className={styles.poster}>
				<img
					src={poster}
					alt="event poster"
				/>
			</div>
			<div className={styles.detail}>
				<div className={styles.detailItem}>
					<span className="caption-lg">رویداد</span>
					<p className="body-md">{name}</p>
				</div>
				<div className={styles.detailItem}>
					<span className="caption-lg">محل برگزاری</span>
					<p className="body-md">{location}</p>
				</div>
				<div className={styles.detailItem}>
					<span className="caption-lg">تاریخ</span>
					<p className="body-md">
						{convertUnixToPersianWeekDate(startTime)}
					</p>
				</div>
			</div>
		</Box>
	);
};

export default EventItem;
