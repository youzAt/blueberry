import IncreaseBalance from "../components/account/IncreaseBalance";
import TransactionHistory from "../components/account/TransactionHistory";
import WalletBalance from "../components/account/WalletBalance";
import styles from "./WalletPage.module.css";
import { useEffect, useState } from "react";
import getAccess from "../funcs/getAccess";
const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";

const WalletPage = () => {
    const [balance, setBalance] = useState("");
    const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
    useEffect(() => {
        const fetchBalance = async () => {
            const res = await fetch(`${BASE_URL}api/payment/balance/`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                getAccess(setToken);
            } else {
                setBalance(data.balance);
            }
        };
        fetchBalance();
    }, [token]);
	return (
		<div className={styles.walletPage}>
			<section>
				<h5>اعتبار کیف پول</h5>
				<WalletBalance balance={balance}/>
			</section>
			<section>
				<h5>افزایش موجودی حساب</h5>
				<IncreaseBalance />
			</section>
			<section>
				<h5>تراکنش های گذشته</h5>
				<TransactionHistory />
			</section>
		</div>
	);
};

export default WalletPage;
