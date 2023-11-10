import styles from "./MainFooter.module.css";
import instagramIcon from "../../assets/icons/instagram.svg";
import telegramIcon from "../../assets/icons/telegram.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import blueberryLogo from "../../assets/icons/blueberrylogotext.svg";
import basuLogo from "../../assets/icons/basuLogo.svg";
import useUrl from "../../hooks/useUrl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const socialMedia = [
	{
		link: "https://t.me/blueberry_events",
		logo: telegramIcon,
		alt: "telegram icon",
	},
	{ link: "#", logo: instagramIcon, alt: "instagram icon" },
	{ link: "#", logo: linkedinIcon, alt: "linkedin icon" },
];

const MainFooter = () => {
	const [newestEvents, setNewesetEvents] = useState([]);
	const [latestEvents, setLatestEvents] = useState([]);
	const BASE_URL = useUrl();
	useEffect(() => {
		const fetchNewestEvents = async () => {
			const res = await fetch(
				`${BASE_URL}api/events/?ordering=-created_at`
			);
			const data = await res.json();
			if (res.ok) {
				setNewesetEvents([
					{ name: data.at(0).name, slug: data.at(0).slug },
					{ name: data.at(1).name, slug: data.at(1).slug },
				]);
			}
		};
		fetchNewestEvents();
	}, [BASE_URL]);
	useEffect(() => {
		const fetchLatestEvents = async () => {
			const res = await fetch(
				`${BASE_URL}api/events/?ordering=-reg_time`
			);
			const data = await res.json();
			if (res.ok) {
				setLatestEvents([
					{ name: data.at(0).name, slug: data.at(0).slug },
					{ name: data.at(1).name, slug: data.at(1).slug },
				]);
			}
		};
		fetchLatestEvents();
	}, [BASE_URL]);
	return (
		<footer className={styles.mainFooter}>
			<div className="container">
				<div className={styles.footerLinks}>
					<div>
						<h6 className={styles.listTitle}>
							تازه ترین رویداد ها
						</h6>
						<ul>
							{newestEvents.length !== 0 ? (
								newestEvents.map((event) => (
									<li className="body-md" key={event.slug}>
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
									<li className="body-md" key={event.slug}>
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
							{socialMedia
								.filter((media) => media.link !== "#")
								.map((media) => (
									<a key={media.alt} href={media.link}>
										<img src={media.logo} alt={media.alt} />
									</a>
								))}
						</div>
					</div>
				</div>
				<div className={styles.logos}>
					<img src={basuLogo} alt="Bu-Ali sina university logo" />
					<Link to="/events" className={styles.blueLogo}>
						<img src={blueberryLogo} alt="Blueberry logo" />
					</Link>
				</div>
			</div>
			<p className={`body-md ${styles.copyRight} container`}>
				کلیه حقوق مادی و معنوی این وب سایت برای <span>بلوبری </span>
				محفوظ است
			</p>
		</footer>
	);
};

export default MainFooter;
