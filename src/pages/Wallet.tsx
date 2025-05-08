
import IncreaseBalance from "../featuers/account/IncreaseBalance";
import WalletBalance from "../featuers/account/WalletBalance";
import styles from "./Wallet.module.css";


const Wallet = () => {
	
	return (
		<div className={styles.walletPage}>
			<section>
				<h5>اعتبار کیف پول</h5>
				<WalletBalance />
			</section>
			<section>
				<h5>افزایش موجودی حساب</h5>
				<IncreaseBalance />
			</section>
			{/* <section>
				<h5>تراکنش های گذشته</h5>
				<TransactionHistory />
			</section> */}
		</div>
	);
};

export default Wallet;
