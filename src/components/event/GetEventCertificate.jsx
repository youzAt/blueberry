import styles from "./GetEventCertificate.module.css";
import Box from "../UI/Box";
import Button from "../UI/Button";
import certificateIcon from "../../assets/icons/award.svg";
import { useNavigate } from "react-router-dom";
const GetEventCertificate = ({cerId}) => {
	const navigate = useNavigate();
	const redirectCertificateHandler = ()=>{
		navigate(`/c/${cerId}`)
	}
	return (
		<Box className={styles.certificateBox}>
			<p className="caption-lg">شما در این رویداد ثبت نام کرده اید</p>
			<Button onClick={redirectCertificateHandler}>
				<img src={certificateIcon} alt="certificate icon" />
				دریافت گواهی
			</Button>
		</Box>
	);
};

export default GetEventCertificate;
