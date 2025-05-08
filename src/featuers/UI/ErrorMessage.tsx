import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
	className?: string;
	children: React.ReactNode;
}
const ErrorMessage = ({ className = "", children }: ErrorMessageProps) => {
	const classes = `caption-lg ${className} ${styles.error}`;
	return <span className={classes}>{children}</span>;
};

export default ErrorMessage;
