const BASE_URL = "https://api-blueberry.liara.run/";
const accessToken = localStorage.getItem("blueberry-access");
const reqHeader = {
	"content-type": "application/json",
	Authorization: `Bearer ${accessToken}`,
};

export const fetchUserBalance = async () => {
	const res = await fetch(`${BASE_URL}api/payment/balance/`, {
		method: "GET",
		headers: reqHeader,
	});
	const data = await res.json();
	/*
if (!res.ok) {
				getAccess(setToken);
			} else {
				setBalance(data.balance);
			}
*/
	return data.balance;
};
