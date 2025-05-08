import React, { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonTypes = "primary" | "secondary" | "outline" | "tertiary";
interface ButtonProps {
	children: ReactNode;
	onClick: (event?: React.MouseEvent) => void;
	type: ButtonTypes;
	isSmall: boolean;
	disabled: boolean;
	className: string;
}
const Button = ({
	disabled,
	children,
	onClick,
	className = "",
	type = "primary",
	isSmall = false,
}: Partial<ButtonProps>) => {
	const clickHandler = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClick?.();
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
