import styles from "./Input.module.css";

const Input = ({
	onChange,
	value,
	placeholder,
	type = "text",
	className = "",
	id,
	disabled,
	name,
	defaultValue,
}) => {
	const classes = `body-sm ${className} ${styles.input} `;
	return (
		<input
			defaultValue={defaultValue}
			name={name}
			disabled={disabled}
			className={classes}
			onChange={onChange}
			value={value ? value : ""}
			placeholder={placeholder}
			type={type}
			id={id}
		/>
	);
};

export default Input;
