import FailPay from "../featuers/resultState/FailPay";

const WaitPay = () => {
	document.title = "Blue Berry | Waiting for payment";
	return <FailPay />;
};

export default WaitPay;
