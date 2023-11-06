import styles from "./Success.module.css";
import Box from "../UI/Box";
import Button from "../UI/Button";
import tickIcon from "../../assets/icons/tick-circle-fill.svg";
import { useNavigate } from "react-router-dom";
const Success = ({trackingCode}) => {
	
	const navigate = useNavigate();
	const redirectHandler = () => {
		navigate("./../ticket");
	};
	return (
		<Box className={styles.successBox}>
			<div className={styles.icon}>
				<img src={tickIcon} alt="tick icon" />
			</div>
			<h5>ممنونیم</h5>
			<p className={`body-lg`}>
				ثبت نام شما در رویداد با موفقیت انجام شد
			</p>
			<div className={styles.checkCode}>
				<p className={`caption-lg`}>کد رهگیری: {trackingCode}</p>
			</div>
			<Button onClick={redirectHandler}>چاپ بلیت</Button>
		</Box>
	);
};

export default Success;
