import styles from "./WaitPayment.module.css";
import Box from "../UI/Box";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
const WaitPayment = ({ slug }: { slug: string }) => {
	const navigate = useNavigate();
	const redirectCertificateHandler = () => {
		navigate(`/events/${slug}/signup-waiting`);
	};
	return (
		<Box className={styles.certificateBox}>
			<p className="caption-lg">شما در این رویداد پیش ثبت نام کرده اید</p>
			<Button type="secondary" onClick={redirectCertificateHandler}>
				{/* <img src={certificateIcon} alt="certificate icon" /> */}
				پرداخت و تکمیل ثبت نام
			</Button>
		</Box>
	);
};

export default WaitPayment;
