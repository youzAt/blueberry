import styles from "./Success.module.css";
import Box from "../UI/Box";
import Button from "../UI/Button";
import tickIcon from "../../assets/icons/tick-circle-fill.svg";
const Success = () => {
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
				<p className={`caption-lg`}>کد رهگیری: 2424891413</p>
			</div>
			<Button>چاپ بلیت</Button>
		</Box>
	);
};

export default Success;
