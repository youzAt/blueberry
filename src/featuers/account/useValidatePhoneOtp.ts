import { useMutation } from "@tanstack/react-query"
import { validateChangePhoneOtp } from "../../services/apiUser"

export const useValidatePhoneOtp = ()=>{
    const {mutate, isPending} = useMutation({
        mutationFn: validateChangePhoneOtp
    })

    return {mutate, isPending}
}