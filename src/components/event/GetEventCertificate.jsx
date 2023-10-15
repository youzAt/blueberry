import styles from "./GetEventCertificate.module.css";
import Box from "../UI/Box";
import Button from "../UI/Button";
import certificateIcon from "../../assets/icons/award.svg";
const GetEventCertificate = () => {
	return (
		<Box className={styles.certificateBox}>
			<p className="caption-lg">شما در این رویداد ثبت نام کرده اید</p>
			<Button>
				<img src={certificateIcon} alt="certificate icon" />
				دریافت گواهی
			</Button>
		</Box>
	);
};

export default GetEventCertificate;
