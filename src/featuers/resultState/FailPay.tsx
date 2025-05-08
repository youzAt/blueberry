import Box from "../UI/Box";
import Button from "../UI/Button";
import walletIcon from "../../assets/icons/wallet-add.svg";
import styles from "./FailPay.module.css";
import { usePayDetail } from "./usePayDetail";
import Loader from "../UI/Loader";

const FailPay = () => {
	const { data, isLoading } = usePayDetail();
	if (isLoading) return <Loader />;
	

	const { amount: price, short_link: shortLink } = data;

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
				<b> {(+price * 10).toLocaleString()} ریال </b>
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
