import { useSearchParams } from "react-router-dom";
import SuccessComponent from "../featuers/resultState/Success";
const Success = () => {
	document.title = "Blue Berry | SignUp Successfull";
	const [searchParams] = useSearchParams();
	const trackingCode = searchParams.get("code")!;
	return <SuccessComponent trackingCode={trackingCode} />;
};

export default Success;
