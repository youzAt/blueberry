import styles from "./SuccessPay.module.css";
import Box from "../UI/Box";
import Button from "../UI/Button";
import tickIcon from "../../assets/icons/tick-circle-fill.svg";
const SuccessPay = () => {
	return (
		<Box className={styles.successBox}>
			<div className={styles.icon}>
				<img src={tickIcon} alt="tick icon" />
			</div>
			<h5>پرداخت با موفقیت انجام شد.</h5>
			
			<div className={styles.checkCode}>
				<p className={`caption-lg`}>کد رهگیری: 2424891413</p>
			</div>
			<Button>چاپ بلیت</Button>
		</Box>
	);
};

export default SuccessPay;
