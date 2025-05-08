import Box from "../UI/Box";
import styles from "./WalletBalance.module.css";
import walletIcon from "../../assets/icons/wallet-2.svg";
import { useBalance } from "./useBalance";
import Loader from "../UI/Loader";

const WalletBalance = () => {
	const { data: balance, isLoading } = useBalance();

	return (
		<Box className={styles.balanceBox}>
			{isLoading ? (
				<Loader />
			) : (
				<>
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
				</>
			)}
		</Box>
	);
};

export default WalletBalance;
