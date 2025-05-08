import styles from "./Certificate.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCertificate } from "../featuers/event/useCertificate";
import { Link } from "react-router-dom";
import shareIcon from "../assets/icons/share.svg";
import downloadIcon from "../assets/icons/arrow-down.svg";
import tickIcon from "../assets/icons/tick-circle.svg";
import Box from "../featuers/UI/Box";
import Button from "../featuers/UI/Button";
import Loader from "../featuers/UI/Loader";

const Certificate = () => {
	document.title = "Blue Berry | Certificate";
	const navigate = useNavigate();
	const [isCopies, setIsCopies] = useState(false);
	const { data, isError, isLoading } = useCertificate();

	if (isLoading) return <Loader />;

	if (isError) {
		navigate("/not-found");
	}

	const copyHandler = () => {
		navigator.clipboard.writeText(location.hostname + location.pathname);
		setIsCopies(true);
	};
	return (
		<div className={`${styles.container}`}>
			<h5>استعلام گواهی</h5>
			<Box className={styles.cerBox}>
				<img src={data?.certificate} alt="certificate page" />
			</Box>
			<div className={styles.btns}>
				<Link to={data?.certificate} download target="_blank">
					<Button>
						دانلود
						<img src={downloadIcon} alt="download icon" />
					</Button>
				</Link>
				<Button type="outline" onClick={copyHandler}>
					کپی لینک
					{isCopies ? (
						<img src={tickIcon} alt="tick icon" />
					) : (
						<img src={shareIcon} alt="share icon" />
					)}
				</Button>
			</div>
		</div>
	);
};

export default Certificate;
