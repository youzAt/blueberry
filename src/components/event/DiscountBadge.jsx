import styles from "./DiscountBadge.module.css";
const DiscountBadge = ({ children, isSecondary }) => {
	return (
		<span
			className={`body-md ${styles.discount} ${
				isSecondary && styles.secondary
			}`}
		>
			%{children}
		</span>
	);
};

export default DiscountBadge;
