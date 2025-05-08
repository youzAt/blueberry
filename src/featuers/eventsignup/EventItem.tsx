import { convertUnixToPersianDate } from "../../utils/helpers";
import { useEvent } from "../event/useEvent";
import Box from "../UI/Box";
import styles from "./EventItem.module.css";
import defaultPhoto from "../../assets/defaultphoto.svg";
import Loader from "../UI/Loader";

const EventItem = () => {
	const { data: event, isLoading } = useEvent();
	const {
		poster = "",
		name = "",
		location = "",
		start_time = 0,
	} = event || {};
	document.title = "Blue Berry | SignUp - " + (name || "");

	return (
		<Box className={styles.eventItemBox}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className={styles.poster}>
						<img src={poster || defaultPhoto} alt="event poster" />
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
								{convertUnixToPersianDate(start_time)}
							</p>
						</div>
					</div>
				</>
			)}
		</Box>
	);
};

export default EventItem;
