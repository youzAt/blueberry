import styles from "./CheckListItem.module.css";
import tickIcon from "../../assets/icons/tick-circle.svg";
import deactiveTickIcon from "../../assets/icons/tick-circle-gray.svg";
const CheckListItem = ({ children, className, isLarge }) => {
	const classes = `${className} ${styles.checkList}`;
	return (
		<div className={classes}>
			<img
				src={className === "deactive" ? deactiveTickIcon : tickIcon}
				alt="tick icon"
			/>
			<p className={isLarge ? "caption-lg" : "caption-md"}>{children}</p>
		</div>
	);
};

export default CheckListItem;
