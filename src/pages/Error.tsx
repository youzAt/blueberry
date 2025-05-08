import styles from "./Error.module.css";
import { useNavigate } from "react-router-dom";
import errorLogo from "../assets/icons/404.svg";
import Button from "../featuers/UI/Button";
const Error = () => {
	const navigate = useNavigate();
	const redirectHandler = () => {
		navigate("/events");
	};
	return (
		<div className={styles.errorPage}>
			<img src={errorLogo} alt="404 logo" />
			<h5>صفحه‌ای که دنبالش هستید رو پیدا نکردیم</h5>
			<p className="body-lg">
				برای پیدا کردن مسیر درست می‌تونید سری به رویداد های بلوبری بزنید
			</p>
			<Button onClick={redirectHandler}>مشاهده رویداد ها</Button>
		</div>
	);
};

export default Error;
