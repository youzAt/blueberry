import styles from "./ticket.module.css";
import defaultPhoto from "../../assets/defaultphoto.svg";
import barcode from "../../assets/barcode-png.png";
import logo from "../../assets/icons/logo-small.svg";
import React from "react";
import moment from "moment-jalaali";
const TIME = 1699268455;

function convertUnixToPersianWeekDate(unixTimestamp) {
	const date = new Date(unixTimestamp * 1000);
	moment.loadPersian({ dialect: "persian-modern" });
	const persianDate = {
		data: moment(date).format("dddd jD jMMMM jYYYY", "fa"),
		hour: `${moment(date).hour()}:${moment(date).minute()}`,
	};

	return persianDate;
}
// eslint-disable-next-line react/display-name
const ticket = React.forwardRef(({ info }, ref) => {
	const { event, answers, short_link: shortLink } = info;
	return (
		<div className={styles.ticket} ref={ref}>
			<div className={styles.eventBanner}>
				<img
					className={styles.eventPhoto}
					src={event?.banner ? event.banner : defaultPhoto}
					alt={`${event?.name} event banner`}
				/>
			</div>
			<div className={styles.ticketBottom}>
				<div className={`${styles.ticketItem} ${styles.ticketTitle}`}>
					<span className="caption-lg">رویداد</span>
					<h6>{event?.name}</h6>
				</div>
				<div className={styles.ticketDetail}>
					{answers?.map((item) => (
						<div key={item.question} className={styles.ticketItem}>
							<span className="caption-lg">{item.question}</span>
							<p className="body-md">{item.answer}</p>
						</div>
					))}

					<div className={styles.ticketItem}>
						<span className="caption-lg">تاریخ</span>
						<p className="body-md">
							{convertUnixToPersianWeekDate(TIME).data}
						</p>
					</div>
					<div className={styles.ticketItem}>
						<span className="caption-lg">زمان</span>
						<p className="body-md">ساعت {convertUnixToPersianWeekDate(TIME).hour}</p>
					</div>
					<div className={styles.ticketItem}>
						<span className="caption-lg">محل برگزاری</span>
						<p className="body-md">{event?.location}</p>
					</div>
				</div>
			</div>
			<div className={styles.bottomPart}>
				<div className={styles.barcode}>
					<img src={barcode} alt="ticket barcode" />
					<span className="body-lg">{shortLink}</span>
				</div>
				<div className={styles.desc}>
					<div className={styles.logo}>
						<img src={logo} alt="blueberry logo" />
					</div>
					<p className="body-md">
						تازه ترین رویداد های انجمن در: BlueBerry.ai
					</p>
				</div>
			</div>
		</div>
	);
});
export default ticket;
