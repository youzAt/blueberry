import { useQuery } from "@tanstack/react-query"
import { fetchPayDetails } from "../../services/apiPayment"
import { useParams } from "react-router-dom"

export const usePayDetail = () => {
    const {eventSlug} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: ['payDetail'],
        queryFn: ()=>fetchPayDetails(eventSlug as string)
    })

    return {data, isLoading}
}