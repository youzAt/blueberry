// import Loader from "../components/UI/Loader";
import { useNavigate } from "react-router-dom";
import { useShortLink } from "../featuers/event/useShortLink";
import Loader from "../featuers/UI/Loader";

const ShortLink = () => {
	document.title = "Blue Berry | Short Link"
	const navigate = useNavigate();
	const { data, isError, isSuccess } = useShortLink();
	
	if (isError) {
		navigate("/page-not-found");
	} else if (isSuccess) {
		navigate(`/events/${data.slug}`);
	}


	return <Loader />;
};

export default ShortLink;
