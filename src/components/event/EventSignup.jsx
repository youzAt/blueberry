import Box from "../UI/Box";
import Button from "../UI/Button";
import CheckListItem from "../UI/CheckListItem";
import styles from "./EventSignup.module.css";
import DiscountBadge from "./discountBadge";
const EventSignup = ({ initialFee, finalFee }) => {
	const discount = (1 - finalFee / initialFee) * 100;
	const price =
		finalFee === 0 ? (
			<div className={`caption-lg ${styles.price}`}>
				<h4> رایگان </h4>
			</div>
		) : (
			<>
				<h6>قیمت بلیت:</h6>
				<div className={`caption-lg ${styles.price}`}>
					{initialFee && (
						<p className="body-xl">
							<s> {initialFee?.toLocaleString()} </s>
							<DiscountBadge>{discount.toFixed(0)}</DiscountBadge>
						</p>
					)}
					<h4> {finalFee?.toLocaleString()} </h4>
					ءتءء
				</div>
			</>
		);
	return (
		<Box className={styles.eventSignup}>
			{price}
			<Button type="secondary">ثبت نام کنید</Button>
			<CheckListItem isLarge>کسب گواهی شرکت در دوره</CheckListItem>
		</Box>
	);
};

export default EventSignup;
