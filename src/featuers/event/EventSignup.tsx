import Box from "../UI/Box";
import Button from "../UI/Button";
import CheckListItem from "../UI/CheckListItem";
import styles from "./EventSignup.module.css";
import DiscountBadge from "./DiscountBadge";
import { useNavigate } from "react-router-dom";
import LoginModal from "../eventsignup/LoginModal";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

interface EventSignupProps {
	initialFee: number;
	finalFee: number;
	slug: string;
	setNextUrl: Dispatch<SetStateAction<string>>;
}
const EventSignup = ({
	initialFee,
	finalFee,
	slug,
	setNextUrl,
}: EventSignupProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const { isLogin } = useAuth();
	const signupHandler = () => {
		if (!isLogin) {
			setNextUrl(`/events/${slug}`);
			navigate("/login");
		} else {
			navigate(`/signup/${slug}`);
		}
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
			<CheckListItem isLarge className={styles.checkList}>
				کسب گواهی شرکت در دوره
			</CheckListItem>
		</Box>
	);
};

export default EventSignup;
