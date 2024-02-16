import Box from "../UI/Box";
import Button from "../UI/Button";
// import bagIcon from "../../assets/icons/bag-cross.svg";
import walletIcon from "../../assets/icons/wallet-add.svg";
import styles from "./FailPay.module.css";

const FailPay = ({ price, shortLink }) => {
	return (
		<Box className={styles.failPayBox}>
			<div className={styles.icon}>
				<img src={walletIcon} alt="tick icon" />
			</div>
			<h5>پرداخت و تکمیل ثبت نام</h5>
			<p className={`body-lg ${styles.desc}`}>
				پیش ثبت نام با موفقیت انجام شد. <br />
				<br />
				برای تکمیل ثبت نام مبلغ
				<b>{(+price * 10).toLocaleString()} تومان</b>
				را در لینک زیر پرداخت کنید.
				<br />
				پس از تایید ادمین ثبت نام شما تکیمل و از طریق پیامک به شما اطلاع
				رسانی خواهد شد.
			</p>
			<div className={styles.checkCode}>
				<p className={`caption-lg`}>کد رهگیری: {shortLink}</p>
			</div>
			<Button type="secondary" className={styles.btn}>
				<a href="https://zarinp.al/ssce_basu">ورود به درگاه</a>
			</Button>
		</Box>
	);
};

export default FailPay;
