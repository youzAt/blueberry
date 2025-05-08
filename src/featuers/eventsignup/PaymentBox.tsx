import Box from "../UI/Box";
import styles from "./PaymentBox.module.css";
import DiscountBadge from "../event/DiscountBadge";
import trashIcon from "../../assets/icons/trash.svg";
import { Dispatch, SetStateAction, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import { useValidateDiscount } from "./useValidateDiscount";
import { useBalance } from "../account/useBalance";
import { useParams } from "react-router-dom";
import { useEvent } from "../event/useEvent";
import Loader from "../UI/Loader";
import { ClipLoader } from "react-spinners";

interface PaymentBoxProps {
	discountCode: string;
	setDiscountCode: Dispatch<SetStateAction<string>>;
	isPending: boolean;
}
interface discountDetailType {
	discount_percent: number;
	discount_fee: number;
	final_fee: number;
}
const PaymentBox = ({
	discountCode,
	setDiscountCode,
	isPending,
}: PaymentBoxProps) => {
	const [showDiscountInput, setShowDiscountInput] = useState(true);
	const [discountAlert, setDiscountAlert] = useState(false);
	const [hasError, setHasError] = useState(false);
	const { mutate: validateDiscountCode, isPending: isPending2 } =
		useValidateDiscount();
	const { eventSlug: slug } = useParams();
	const { data: event, isLoading: isLoading1 } = useEvent();
	const { data: balance, isLoading: isLoading2 } = useBalance();
	const isLoading = isLoading1 || isLoading2;
	const [discountDetail, setDiscountDetail] = useState<
		Partial<discountDetailType>
	>({});

	const { fee = 0, initial_fee: initialFee = 0 } = event || {};
	const {
		discount_percent: percent,
		discount_fee: discountFee,
		final_fee: finalFee,
	} = discountDetail;
	const feee = finalFee || finalFee === 0 ? finalFee : fee;
	const displayedBalance = balance > feee ? feee : balance;
	const checkDiscountCode = () => {
		if (discountCode.trim() === "") return;

		setDiscountAlert(false);
		setHasError(false);
		validateDiscountCode(
			{ slug: slug as string, discountCode },
			{
				onSuccess: (data) => {
					setDiscountAlert(true);
					setShowDiscountInput(false);
					setDiscountDetail(data);
				},
				onError: () => {
					setHasError(true);
				},
			}
		);
	};
	const deleteDiscountHandler = () => {
		setDiscountAlert(false);
		setShowDiscountInput(true);
		setDiscountCode("");
		setDiscountDetail({});
	};
	const finalDisplayedFee = feee - balance < 0 ? 0 : feee - balance;
	const initPercent = (1 - fee / initialFee) * 100;
	const ticketPrice = initialFee ? initialFee : fee;
	return (
		<Box className={styles.paymentBox}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className={`${styles.costItem} ${styles.ticket}`}>
						<span className={`body-md `}>هزینه بلیت</span>
						<div>
							{ticketPrice !== 0 ? (
								<>
									<h6>{ticketPrice?.toLocaleString()}</h6>
									<span className="caption-lg">ءتءء</span>
								</>
							) : (
								<h6>رایگان</h6>
							)}
						</div>
					</div>
					{initialFee && (
						<div
							className={`${styles.costItem} ${styles.discount}`}
						>
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
						<div
							className={`${styles.costItem} ${styles.discount}`}
						>
							<span className={`body-md `}>
								<DiscountBadge isSecondary>
									{percent}
								</DiscountBadge>{" "}
								کد تخفیف :{discountCode}
							</span>
							<div>
								<h6>{discountFee?.toLocaleString()}</h6>
								<span className="caption-lg">ءتءء</span>
								<Button
									type="tertiary"
									onClick={deleteDiscountHandler}
								>
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
							{finalDisplayedFee !== 0 ? (
								<>
									<h5>
										{finalDisplayedFee.toLocaleString()}
									</h5>
									<span className="caption-lg">ءتءء</span>
								</>
							) : (
								<h5>رایگان</h5>
							)}
						</div>
					</div>
					{finalDisplayedFee !== 0 && showDiscountInput && (
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
										setHasError(false)
										setDiscountCode(e.target.value);
									}}
									className={hasError ? "error" : ""}
									disabled={isPending || isPending2}
								/>
								<Button
									type="tertiary"
									isSmall
									onClick={checkDiscountCode}
									disabled={isPending || isPending2}
								>
									{isPending2 ? (
										<ClipLoader size={25} />
									) : (
										"ثبت"
									)}
								</Button>
							</form>
							{hasError && (
								<ErrorMessage>
									کد وارد شده نامعتبر است
								</ErrorMessage>
							)}
						</div>
					)}
					{discountAlert && (
						<div className={`body-sm ${styles.alert}`}>
							کد تخفیف با موفقیت اعمال شد
						</div>
					)}
				</>
			)}
		</Box>
	);
};

export default PaymentBox;
