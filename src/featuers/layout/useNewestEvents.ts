import { useQuery } from "@tanstack/react-query"
import { fetchNewestEvents } from "../../services/apiEvents"

export const useNewestEvents = ()=>{
    const {data: events, isLoading, error} =  useQuery({
        queryKey: ['newestEvents', 'last-2'],
        queryFn: fetchNewestEvents
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