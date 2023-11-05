import styles from "./Button.module.css";
const Button = ({
	disabled,
	children,
	onClick,
	className = "",
	type = "primary",
	isSmall = false,
}) => {
	const clickHandler = (e) => {
		e.stopPropagation();
		onClick();
	};

	const textSize = isSmall ? "button-sm" : "button-lg";
	const classes = `${className} ${textSize} ${styles.btn} ${styles[type]} `;
	return (
		<button className={classes} onClick={clickHandler} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
