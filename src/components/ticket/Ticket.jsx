import styles from "./ticket.module.css";
import defaultPhoto from "../../assets/defaultphoto.svg";
import barcode from "../../assets/barcode-png.png";
import logo from "../../assets/icons/logo-small.svg";
import React from "react";
// eslint-disable-next-line react/display-name
const ticket = React.forwardRef((props, ref) => {
	return (
		<div className={styles.ticket} ref={ref}>
			<div className={styles.eventBanner}>
				<img
					className={styles.eventPhoto}
					src={defaultPhoto}
					alt="evet photo"
				/>
			</div>
			<div className={styles.ticketBottom}>
				<div className={`${styles.ticketItem} ${styles.ticketTitle}`}>
					<span className="caption-lg">رویداد</span>
					<h6>مسابقه دوم لیگ BCPC</h6>
				</div>
				<div className={styles.ticketDetail}>
					<div className={styles.ticketItem}>
						<span className="caption-lg">دانشجو</span>
						<p className="body-md">صالح سلیمانی</p>
					</div>
					<div className={styles.ticketItem}>
						<span className="caption-lg">شماره دانشجوئی</span>
						<p className="body-md">۴۰۰۱۲۳۵۸۰۱۸</p>
					</div>
					<div className={styles.ticketItem}>
						<span className="caption-lg">تاریخ</span>
						<p className="body-md">شنبه ۱۶ مهر ۱۴۰۱</p>
					</div>
					<div className={styles.ticketItem}>
						<span className="caption-lg">زمان</span>
						<p className="body-md">ساعت ۱۳</p>
					</div>
				</div>
				<div className={styles.ticketItem}>
					<span className="caption-lg">محل برگزاری</span>
					<p className="body-md">دانشکده مهندسی، کارگاه کامپیوتر</p>
				</div>
			</div>
			<div className={styles.bottomPart}>
				<div className={styles.barcode}>
					<img src={barcode} alt="ticket barcode" />
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
