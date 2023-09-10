import styles from "./Input.module.css";

const Input = ({ onChange, value, placeholder, type = "text", className="" }) => {
    const classes = `body-sm ${className} ${styles.input} ${styles.system}`
	return (
		<input
			className={classes}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			type={type}
		/>
	);
};

export default Input;
