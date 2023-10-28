import Box from "../UI/Box";
import styles from "./TransactionHistory.module.css";
const tableHeads = ["تاریخ و ساعت", "مبلغ (ءتءء)", "نوع تراکنش", "کد رهگیری"];
const transactions = [
	{
		code: "234151829123",
		type: "افزایش اعتبار حساب",
		amount: 80000,
		date: "1402/07/15 - 22:42",
	},
	{
		code: "909213812123",
		type: "خرید بلیت سمینار فرانت",
		amount: -120000,
		date: "1402/07/15 - 19:42",
	},
];
const TransactionHistory = () => {
	return (
		<Box className={styles.transactionBox}>
			<table className="caption-lg">
				<thead>
					<tr>
						{tableHeads.map((title) => (
							<th key={title}>{title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{transactions.map((trans) => (
						<tr key={trans.code}>
							<td>{trans.date}</td>
							<td>
								<span
									dir="ltr"
									className={
										trans.amount < 0
											? styles.decrease
											: styles.increase
									}
								>
									{trans.amount > 0 ? "+" : ""}
									{trans.amount.toLocaleString()}
								</span>
							</td>
							<td>{trans.type}</td>
							<td>{trans.code}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Box>
	);
};

export default TransactionHistory;
