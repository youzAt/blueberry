import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import styles from "./MyEventPage.module.css";
const MyEventPage = () => {
	const navigate = useNavigate();
	const redirectHandler = () => {
		navigate("/events");
	};
	return (
		<div className={styles.noEvents}>
			<h5>هنوز در رویدادی شرکت نکردید</h5>
			<p className="body-lg">
				با مشاهده رویداد ها در جریان آخرین رویداد های بلوبری باشید
			</p>
			<Button onClick={redirectHandler}>مشاهده رویداد ها</Button>
		</div>
	);
};

export default MyEventPage;
