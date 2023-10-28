import { useState } from "react";
import Box from "../UI/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./IncreaseBalance.module.css";

const amounts = [30000, 50000, 100000, 200000];
const IncreaseBalance = () => {
	const [increaseAmount, setIncreaseAmount] = useState("0");
	const increaseAmountChangeHandler = (e) => {
		setIncreaseAmount(e.target.value);
	};
	const amountOptionHander = (amount) => {
		setIncreaseAmount(amount);
	};
	return (
		<Box>
			<span className={`caption-lg ${styles.title}`}>مبلغ شارژ حساب</span>
			<div className={styles.increaseForm}>
				<Input
					type="number"
					className={styles.input}
					value={increaseAmount}
					onChange={increaseAmountChangeHandler}
				/>
				<div className={styles.amounts}>
					{amounts.map((amount) => (
						<Button
							key={amount}
							type="outline"
							className={styles.amountOption}
							onClick={() => amountOptionHander(amount)}
						>
							<span className={styles.cost}>
								{amount.toLocaleString()}
							</span>
							<span className={`${styles.desc} caption-lg`}>
								ءتءء
							</span>
						</Button>
					))}
				</div>
				<Button type="secondary">پرداخت آنلاین</Button>
			</div>
		</Box>
	);
};

export default IncreaseBalance;
