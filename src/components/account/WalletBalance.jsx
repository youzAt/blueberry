import Box from "../UI/Box";
import styles from "./WalletBalance.module.css";
import walletIcon from "../../assets/icons/wallet-2.svg";
const WalletBalance = ({balance}) => {
	return (
		<Box className={styles.balanceBox}>
			<div className={styles.icon}>
				<img src={walletIcon} alt="wallet icon" />
			</div>
			<div className={styles.detail}>
				<span className="caption-lg">مانده اعتبار کیف پول</span>
				<div className={styles.amount}>
					<h6>{balance?.toLocaleString()}</h6>
					<span className="caption-lg">ءتءء</span>
				</div>
			</div>
		</Box>
	);
};

export default WalletBalance;
