import styles from "./Button.module.css";
const Button = ({
	children,
	onClick,
	className = "",
	type = "primary",
	isSmall = false,
}) => {
	const textSize = isSmall ? "button-sm" : "button-lg";
	const classes = `${className} ${textSize} ${styles.btn} ${styles[type]} `;
	return (
		<button className={classes} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
