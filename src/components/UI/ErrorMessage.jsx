import styles from "./ErrorMessage.module.css";
const ErrorMessage = ({ className = "", children }) => {
	const classes = `caption-lg ${className} ${styles.error}`;
	return <span className={classes}>{children}</span>;
};

export default ErrorMessage;
