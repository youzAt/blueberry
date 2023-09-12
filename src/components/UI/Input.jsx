import styles from "./Input.module.css";

const Input = ({ onChange, value, placeholder, type = "text", className="", id }) => {
    const classes = `body-sm ${className} ${styles.input} `
	return (
		<input
			className={classes}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			type={type}
			id={id}
		/>
	);
};

export default Input;
