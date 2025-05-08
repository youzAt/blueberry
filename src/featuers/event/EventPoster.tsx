import styles from "./EventPoster.module.css";
interface EventPosterProps {
	src: string;
	name: string;
}
const EventPoster = ({ src, name }: EventPosterProps) => {
	return (
		<div className={styles.poster}>
			<img src={src} alt={`${name} event poster`} />
		</div>
	);
};

export default EventPoster;
