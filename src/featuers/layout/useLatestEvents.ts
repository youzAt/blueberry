import { useQuery } from "@tanstack/react-query"
import { fetchLatestEvents } from "../../services/apiEvents"

export const useLatestEvents = ()=>{
    const {data: events, isLoading, error} = useQuery({
        queryKey: ['LatestEvents', 'last-2'],
        queryFn: fetchLatestEvents
    })

    const data: {
        name: string;
        slug: string;
    }[] = [
        { name: events?.at(0).name, slug: events?.at(0).slug },
        { name: events?.at(1).name, slug: events?.at(1).slug },
    ]

    return {data ,isLoading, error}
}