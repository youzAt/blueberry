import { ReactNode } from "react";
import Box from "../UI/Box";
import styles from "./EventDescription.module.css";
interface EventDescriptionProps {
	children?: ReactNode;
}
const EventDescription = ({ children }: EventDescriptionProps) => {
	return (
		<Box>
			<pre className={`body-lg ${styles.desc}`}>{children} </pre>
		</Box>
	);
};

export default EventDescription;
