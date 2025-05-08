import { ReactNode } from "react";
import styles from "./DiscountBadge.module.css";

interface DiscountBadgeProps {
	children: ReactNode;
	isSecondary?: boolean;
}
const DiscountBadge = ({ children, isSecondary }: DiscountBadgeProps) => {
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
