import Box from "../UI/Box";
import styles from "./PaymentBox.module.css";
import DiscountBadge from "../event/DiscountBadge";
import trashIcon from "../../assets/icons/trash.svg";
import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import useUrl from "../../hooks/useUrl";

const PaymentBox = ({
	fee,
	initialFee,
	balance,
	slug,
	discountCode,
	setDiscountCode,
}) => {
	const BASE_URL = useUrl();
	const [showDiscountInput, setShowDiscountInput] = useState(true);
	const [discountAlert, setDiscountAlert] = useState(false);
	const [discountDetail, setDiscountDetail] = useState("");
	const [hasError, setHasError] = useState(false);
	const accessToken = localStorage.getItem("blueberry-access");
	const {
		discount_percent: percent,
		discount_fee: discountFee,
		final_fee: finalFee,
	} = discountDetail;
	const feee = finalFee || finalFee === 0 ? finalFee : fee;
	const displayedBalance = balance > feee ? feee : balance;
	const checkDiscountCode = () => {
		setDiscountAlert(false);
		setHasError(false);
		const checkDiscount = async () => {
			const res = await fetch(
				`${BASE_URL}api/events/gift-code-check/${slug}/${discountCode}/`,
				{
					method: "GET",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await res.json();
			if (res.ok) {
				setDiscountAlert(true);
				setShowDiscountInput(false);
				setDiscountDetail(data);
			} else {
				setHasError(true);
			}
		};
		checkDiscount();
	};
	const deleteDiscountHandler = () => {
		setDiscountAlert(false);
		setShowDiscountInput(true);
		setDiscountCode("");
		setDiscountDetail("");
	};
	const finalDisplayedFee = feee - balance < 0 ? 0 : feee - balance;
	const initPercent = (1 - fee / initialFee) * 100;
	return (
		<Box className={styles.paymentBox}>
			<div className={`${styles.costItem} ${styles.ticket}`}>
				<span className={`body-md `}>هزینه بلیت</span>
				<div>
					<h6>
						{initialFee
							? initialFee.toLocaleString()
							: fee?.toLocaleString()}
					</h6>
					<span className="caption-lg">ءتءء</span>
				</div>
			</div>
			{initialFee && (
				<div className={`${styles.costItem} ${styles.discount}`}>
					<span className={`body-md `}>
						<DiscountBadge isSecondary>
							{initPercent.toFixed(0)}
						</DiscountBadge>
						تخفیف خرید زود هنگام
					</span>
					<div>
						<h6>{(initialFee - fee)?.toLocaleString()}</h6>
						<span className="caption-lg">ءتءء</span>
					</div>
				</div>
			)}
			{discountAlert && (
				<div className={`${styles.costItem} ${styles.discount}`}>
					<span className={`body-md `}>
						<DiscountBadge isSecondary>{percent}</DiscountBadge> کد
						تخفیف :{discountCode}
					</span>
					<div>
						<h6>{discountFee?.toLocaleString()}</h6>
						<span className="caption-lg">ءتءء</span>
						<Button type="tertiary" onClick={deleteDiscountHandler}>
							<img src={trashIcon} alt="trash icon" />
						</Button>
					</div>
				</div>
			)}
			{displayedBalance !== 0 && (
				<div className={`${styles.costItem} ${styles.balance}`}>
					<span className={`body-md `}>پرداخت از اعتبار</span>
					<div>
						<h6>{displayedBalance?.toLocaleString()}</h6>
						<span className="caption-lg">ءتءء</span>
					</div>
				</div>
			)}
			<div className={`${styles.costItem} ${styles.final}`}>
				<span className={`body-md `}>مبلغ قابل پرداخت</span>
				<div>
					{
						//finalDisplayedFee !== 0 ? (
						<>
							<h5>{finalDisplayedFee.toLocaleString()}</h5>
							<span className="caption-lg">ءتءء</span>
						</>
						//) : (
						//	<h5>رایگان</h5>
						//)
					}
				</div>
			</div>
			{showDiscountInput && (
				<div className={styles.discountBox}>
					<label htmlFor="discount" className="caption-lg">
						کد تخفیف دارید؟
					</label>
					<form
						className={styles.inputField}
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<Input
							id="discount"
							placeholder="کد تخفیف خود را وارد کنید"
							value={discountCode}
							onChange={(e) => {
								setDiscountCode(e.target.value);
							}}
							className={hasError && "error"}
						/>
						<Button
							type="tertiary"
							isSmall
							onClick={checkDiscountCode}
						>
							ثبت
						</Button>
					</form>
					{hasError && (
						<ErrorMessage>کد وارد شده نامعتبر است</ErrorMessage>
					)}
				</div>
			)}
			{discountAlert && (
				<div className={`body-sm ${styles.alert}`}>
					کد تخفیف با موفقیت اعمال شد
				</div>
			)}
		</Box>
	);
};

export default PaymentBox;
