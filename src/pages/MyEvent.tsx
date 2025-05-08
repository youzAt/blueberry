import { useNavigate } from "react-router-dom";
import styles from "./MyEvent.module.css";
import { useUserEvents } from "../featuers/account/useUserEvents";
import Button from "../featuers/UI/Button";
import RegisteredEvents from "../featuers/account/RegisteredEvents";
import Loader from "../featuers/UI/Loader";
const MyEvent = () => {
	const navigate = useNavigate();
	const { data: events, isLoading } = useUserEvents();
	const redirectHandler = () => {
		navigate("/events");
	};
	if (isLoading) return <Loader/>

	if (events?.length === 0) {
		return (
			<div className={styles.noEvents}>
				<h5>هنوز در رویدادی شرکت نکردید</h5>
				<p className="body-lg">
					با مشاهده رویداد ها در جریان آخرین رویداد های بلوبری باشید
				</p>
				<Button onClick={redirectHandler}>مشاهده رویداد ها</Button>
			</div>
		);
	}
	return <RegisteredEvents events={events} />;
};

export default MyEvent;
