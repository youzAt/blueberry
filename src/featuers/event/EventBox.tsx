import styles from "./EventBox.module.css";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import defaultPhoto from "../../assets/defaultphoto.svg";
import certificateIcon from "../../assets/icons/award2.svg";
import ticketIcon from "../../assets/icons/ticket2.svg";
import dollarIcon from "../../assets/icons/dollar.svg";
import { convertUnixToPersianWeekDate } from "../../utils/helpers";
import { useAuth } from "../../context/AuthProvider";

const persianSeqNums = ["اول", "دوم", "سوم", "چهارم"];
interface Status {
	short_link: string;
	details: string;
	status: "CERTIFICATE" | "TICKET" | "WAITING_FOR_PAYMENT" | "ERROR" | "END" | "REG";
}
interface Event {
	slug: string;
	name: string;
	initial_fee: number;
	fee: number;
	start_time: number;
	status: Status;
	banner: string;
}
interface EventBoxProps {
	event: Event;
	className?: string;
	onClick?: () => void;
	setNextUrl?: (slug: string) => void;
}

const EventBox = ({ className, event, onClick, setNextUrl }: EventBoxProps) => {
	const { isLogin } = useAuth();
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

/*************  ✨ Codeium Command ⭐  *************/
/******  40f4014c-4132-4501-a5a8-df36450ce586  *******/	const signupHandler = () => {
		if (!isLogin) {
			setNextUrl?.(slug);
			navigate(`/login`);
		} else {
			navigate(`/signup/${slug}`);
		}
	};

	const eventAction = (
		<div className={styles.eventAction}>
			<Button
				type="outline"
				isSmall
				className={styles.signUpBtn}
				onClick={signupHandler}
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

	const redirectTicketHnadler = () => {
		navigate(`/events/${slug}/ticket`);
	};
	const redicertCertificateHandler = () => {
		navigate(`/c/${status.short_link}`);
	};

	const redirectPaymentHandler = () => {
		navigate(`/events/${slug}/signup-waiting`);
	};

	const error =
		status.status !== "ERROR" && status.status !== "END" ? null : (
			<Button
				isSmall
				type="tertiary"
				className={`deactive ${styles.error}`}
				onClick={() => {
					navigate(`/events/${slug}`);
				}}
			>
				{status.details}
			</Button>
		);
	const certificate =
		status.status !== "CERTIFICATE" ? null : (
			<Button
				type="outline"
				isSmall
				className={styles.outBtn}
				onClick={redicertCertificateHandler}
			>
				<img src={certificateIcon} alt="certificate icon" />
				دریافت گواهی
			</Button>
		);
	const ticket =
		status.status !== "TICKET" ? null : (
			<Button
				onClick={redirectTicketHnadler}
				type="outline"
				isSmall
				className={styles.outBtn}
			>
				<img src={ticketIcon} alt="ticket icon" />
				دریافت بلیت
			</Button>
		);
	const payment =
		status.status !== "WAITING_FOR_PAYMENT" ? null : (
			<Button
				type="outline"
				isSmall
				className={styles.outBtn}
				onClick={redirectPaymentHandler}
			>
				<img src={dollarIcon} alt="dollar icon" />
				پرداخت و تکمیل ثبت نام
			</Button>
		);
	return (
		<div
			onClick={onClick}
			className={`${className} ${styles.eventBox} ${
				error && status.status !== "WAITING_FOR_PAYMENT" && "deactive"
			}`}
		>
			<div className={styles.eventBanner}>
				<img src={banner || defaultPhoto} />
			</div>
			<div className={styles.eventDetails}>
				<span className={`caption-md ${styles.eventDate}`}>
					{`هفته ${persianSeqNums.at(week)} ${month}`}
				</span>
				<h6>{title}</h6>

				{error || certificate || ticket || payment || eventAction}
			</div>
		</div>
	);
};

export default EventBox;
