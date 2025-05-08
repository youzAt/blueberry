import { ComponentPropsWithoutRef } from "react";
import styles from "./Input.module.css";
type InputProps = ComponentPropsWithoutRef<"input">;

const Input = ({ className = "", value = "", ...props }: InputProps) => {
	const classes = `body-sm ${className} ${styles.input} `;
	return <input className={classes} value={value} {...props} />;
};

export default Input;
