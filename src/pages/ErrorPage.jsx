import MainHeader from "../components/layout/MainHeader";
import Button from "../components/UI/Button";
import errorLogo from "../assets/icons/404.svg";
import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
    const navigate = useNavigate()
    const redirectHandler = ()=>{
        navigate('/events')
    }
	return (
		<>
			<MainHeader />
			<main className={styles.errorPage}>
				<img src={errorLogo} alt="404 logo" />
				<h5>صفحه‌ای که دنبالش هستید رو پیدا نکردیم</h5>
				<p className="body-lg">
					برای پیدا کردن مسیر درست می‌تونید سری به رویداد های بلوبری
					بزنید
				</p>
				<Button onClick={redirectHandler}>مشاهده رویداد ها</Button>
			</main>
		</>
	);
};

export default ErrorPage;
