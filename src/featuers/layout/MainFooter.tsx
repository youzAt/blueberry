import styles from "./MainFooter.module.css";
import blueberryLogo from "../../assets/icons/blueberrylogotext.svg";
import basuLogo from "../../assets/icons/basuLogo.jpg";
import { Link } from "react-router-dom";
import { SOCIAL_MEDIA } from "../../utils/constants";
import { useNewestEvents } from "./useNewestEvents";
import { useLatestEvents } from "./useLatestEvents";

interface MainFooterProps {
	className?: string;
}
const MainFooter = ({ className = "" }: MainFooterProps) => {
	const { data: newestEvents } = useNewestEvents();
	const { data: latestEvents } = useLatestEvents();

	return (
		<footer className={`${styles.mainFooter}  ${className}`}>
			<div className="container">
				<div className={styles.footerLinks}>
					<div>
						<h6 className={styles.listTitle}>
							تازه ترین رویداد ها
						</h6>
						<ul>
							{newestEvents.length !== 0 ? (
								newestEvents.map((event) => (
									<li
										className="body-md"
										key={`${event.slug}-${Math.random()}`}
									>
										<Link to={`/events/${event.slug}`}>
											{event.name}
										</Link>
									</li>
								))
							) : (
								<li className="body-md">
									رویدادیی جهت نمایش وجود ندارد
								</li>
							)}
						</ul>
					</div>

					<div>
						<h6 className={styles.listTitle}>آخرین مهلت ثبت نام</h6>
						<ul>
							{latestEvents.length !== 0 ? (
								latestEvents.map((event) => (
									<li
										className="body-md"
										key={`${event.slug}-${Math.random()}`}
									>
										<Link to={`/events/${event.slug}`}>
											{event.name}
										</Link>
									</li>
								))
							) : (
								<li className="body-md">
									رویدادیی جهت نمایش وجود ندارد
								</li>
							)}
						</ul>
					</div>

					{/* <div>
						<h6 className={styles.listTitle}>دسترسی سریع</h6>
						<ul>
							<li className="body-md">استعلام گواهی</li>
							<li className="body-md">تماس با ما</li>
						</ul>
					</div> */}
					<div>
						<h6 className={styles.listTitle}>
							بلوبری در شبکه های اجتماعی
						</h6>
						<div className={styles.icons}>
							{SOCIAL_MEDIA.filter(
								(media) => media.link !== "#"
							).map((media) => (
								<a key={media.alt} href={media.link}>
									<img src={media.logo} alt={media.alt} />
								</a>
							))}
						</div>
					</div>
				</div>
				<div className={styles.logos}>
					<img
						src={basuLogo}
						className={styles.basuLogo}
						alt="Bu-Ali sina university logo"
					/>
					<Link to="/events" className={styles.blueLogo}>
						<img src={blueberryLogo} alt="Blueberry logo" />
					</Link>
				</div>
				<a
					referrerPolicy="origin"
					target="_blank"
					href="https://trustseal.enamad.ir/?id=555480&Code=FNNGJXc0Grr8RvNCIATFoVrCpM4xx5LA"
				>
					<img
						referrerPolicy="origin"
						src="https://trustseal.enamad.ir/logo.aspx?id=555480&Code=FNNGJXc0Grr8RvNCIATFoVrCpM4xx5LA"
						alt=""
						style={{cursor: "pointer"}}
						// code="FNNGJXc0Grr8RvNCIATFoVrCpM4xx5LA"
					/>
				</a>
			</div>
			<p className={`body-md ${styles.copyRight} container`}>
				کلیه حقوق مادی و معنوی این وب سایت برای <span>بلوبری </span>
				محفوظ است
			</p>
		</footer>
	);
};

export default MainFooter;
