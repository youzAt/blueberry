import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../../services/apiLogin"

export const useLogin = ()=>{
    const {mutate, isPending} = useMutation({
        mutationFn: loginUser
    })

    return {mutate, isPending}
}