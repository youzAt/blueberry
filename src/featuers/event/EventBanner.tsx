import styles from "./EventBanner.module.css";

interface EventBannerProps {
	src: string;
	name: string;
}
const EventBanner = ({ src, name }: EventBannerProps) => {
	return (
		<div className={styles.banner}>
			<img src={src} alt={`${name} banner`} />
		</div>
	);
};

export default EventBanner;
