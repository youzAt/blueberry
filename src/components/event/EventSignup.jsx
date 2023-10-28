import Box from "../UI/Box";
import Button from "../UI/Button";
import CheckListItem from "../UI/CheckListItem";
import styles from "./EventSignup.module.css";
import DiscountBadge from "./DiscountBadge";
import { useNavigate } from "react-router-dom";
import LoginModal from "../eventSignup/LoginModal";
import { useState } from "react";

const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";

const EventSignup = ({ initialFee, finalFee, slug }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const accessToken = localStorage.getItem("blueberry-access");
	const navigate = useNavigate();
	const signupHandler = () => {
		const loginCheck = async () => {
			const res = await fetch(`${BASE_URL}api/account/phone-number/`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (!res.ok && res.status === 401) {
				setIsModalOpen(true);
			} else if (res.ok) {
				navigate(`/signup/${slug}`);
			}
		};
		loginCheck();
	};
	const discount = (1 - finalFee / initialFee) * 100;
	const price =
		finalFee === 0 ? (
			<div className={`caption-lg ${styles.price}`}>
				<h4> رایگان </h4>
			</div>
		) : (
			<div className={styles.priceBox}>
				<h6>قیمت بلیت:</h6>
				<div className={`caption-lg ${styles.price}`}>
					{initialFee && (
						<p className={`body-xl ${styles.st}`}>
							<s> {initialFee?.toLocaleString()} </s>
							<DiscountBadge>{discount.toFixed(0)}</DiscountBadge>
						</p>
					)}
					<h4> {finalFee?.toLocaleString()} </h4>
					ءتءء
				</div>
			</div>
		);
	return (
		<Box className={styles.eventSignup}>
			<LoginModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
			/>
			{price}
			<Button type="secondary" onClick={signupHandler}>
				ثبت نام کنید
			</Button>
			<CheckListItem isLarge className={styles.checkList}>کسب گواهی شرکت در دوره</CheckListItem>
		</Box>
	);
};

export default EventSignup;
