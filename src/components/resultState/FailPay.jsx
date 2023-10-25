import Box from "../UI/Box";
import Button from "../UI/Button";
import bagIcon from "../../assets/icons/bag-cross.svg";
import styles from "./FailPay.module.css";
const FailPay = () => {
	return (
		<Box className={styles.failPayBox}>
			<div className={styles.icon}>
				<img src={bagIcon} alt="tick icon" />
			</div>
			<h5>متاسفانه پرداخت انجام نشد</h5>
			<p className={`body-lg ${styles.desc}`}>
				بررسی ما نشان می‌دهد پرداخت شما به درستی انجام نشده است و چنانچه
				مبلغی از حساب شما کسر شده است، حداکثر طی ۷۲ ساعت آینده به حساب
				شما باز خواهد گشت.
			</p>
			<div className={styles.checkCode}>
				<p className={`caption-lg`}>کد رهگیری: 2424891413</p>
			</div>
			<Button type="secondary"> پرداخت مجدد </Button>
		</Box>
	);
};

export default FailPay;
