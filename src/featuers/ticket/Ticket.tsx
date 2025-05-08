import styles from "./ticket.module.css";
import defaultPhoto from "../../assets/defaultphoto.svg";
import logo from "../../assets/icons/logo-small.svg";
import React, { Ref } from "react";
import Barcode from "react-barcode";
import warningIcon from "../../assets/icons/info-circle.svg";
import { convertUnixToPersianHourDate } from "../../utils/helpers";

interface TicketProps {
	info: {
		event: {
			name: string;
			banner: string;
			start_time: number;
			location: string;
			ticket_warnings: {
				title: string;
			}[];
		};
		answers: { question: string; answer: string }[];
		short_link: string;
	};
}

const Ticket = React.forwardRef(({ info }: TicketProps, ref: Ref<HTMLDivElement>) => {
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
				{event?.ticket_warnings.length !== 0 && (
					<div className={styles.ticketWarning}>
						<img src={warningIcon} alt="warning icon" />

						<span className="caption-lg">
							{event?.ticket_warnings?.at(0)?.title}
						</span>
					</div>
				)}
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
							{
								convertUnixToPersianHourDate(event?.start_time)
									.data
							}
						</p>
					</div>
					<div className={styles.ticketItem}>
						<span className="caption-lg">زمان</span>
						<p className="body-md">
							ساعت{" "}
							{
								convertUnixToPersianHourDate(event?.start_time)
									.hour
							}
						</p>
					</div>
					<div className={styles.ticketItem}>
						<span className="caption-lg">محل برگزاری</span>
						<p className="body-md">{event?.location}</p>
					</div>
				</div>
			</div>
			<div className={styles.bottomPart}>
				<div className={styles.barcode}>
					{/* <img src={barcode} alt="ticket barcode" /> */}
					<Barcode value={shortLink} />
					{/* <span className="body-lg">{shortLink}</span> */}
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
export default Ticket;
