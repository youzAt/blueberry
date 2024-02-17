import { useEffect, useState } from "react";
import Box from "../components/UI/Box";
import MainHeader from "../components/layout/MainHeader";
import useUrl from "../hooks/useUrl";
import styles from "./CertificatePage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import shareIcon from "../assets/icons/share.svg";
import downloadIcon from "../assets/icons/arrow-down.svg";
import { Link } from "react-router-dom";
import tickIcon from "../assets/icons/tick-circle.svg";
import Loader from "../components/UI/Loader";

const CertificatePage = () => {
	document.title = "Blue Berry | Certificate"
	const BASE_URL = useUrl();
	const { cerId } = useParams();
	const [cerSrc, setCerSrc] = useState("");
	const navigate = useNavigate();
	const [isCopies, setIsCopies] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchCer = async () => {
			setIsLoading(true);
			const res = await fetch(
				`${BASE_URL}api/event/certificate/c/${cerId}/`
			);
			if (!res.ok) {
				navigate("/not-found");
			} else {
				const data = await res.json();
				setCerSrc(data.certificate);
				setIsLoading(false);
			}
		};
		fetchCer();
	}, [BASE_URL, cerId, navigate]);

	const copyHandler = () => {
		navigator.clipboard.writeText(location.hostname + location.pathname);
		setIsCopies(true);
	};
	return (
		<>
			<MainHeader removeMenu />
			<main className={`container ${styles.container}`}>
				<h5>استعلام گواهی</h5>
				<Box className={styles.cerBox}>
					{isLoading ? (
						<Loader />
					) : (
						<img src={cerSrc} alt="certificate page" />
					)}
				</Box>
				<div className={styles.btns}>
					<Link to={cerSrc} download target="_blank">
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
			</main>
			{/* <MainFooter /> */}
		</>
	);
};

export default CertificatePage;
