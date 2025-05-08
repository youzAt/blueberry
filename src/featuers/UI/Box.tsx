import { ReactNode } from "react";
import styles from "./Box.module.css";
interface BoxProps {
	className?: string;
	children: ReactNode;
}

const Box = ({ className = "", children }: BoxProps) => {
	const classes = `${className} ${styles.box}`;
	return <div className={classes}>{children}</div>;
};

export default Box;
