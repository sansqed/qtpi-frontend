import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"

var token = getToken()
var requester = getRequester()

export const createPayroll = async(employee_id:string, payout:string, date_from:string, date_to:string) => {
    try {
        const response = await postAPICall(URL+"salaries/generate",{
            requester: requester,
            token: token,
            employee_id: employee_id,
            payout: payout,
            date_from: date_from,
            date_to: date_to
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const getPayroll = async(salary_id:string, employee_id:string, position:string, date_from:string, date_to:string) => {
    try {
        const response = await getAPICall(URL+"salaries/get?"+
            "requester=" + requester +
            "&token=" + token +
            "&salary_id=" + salary_id +
            "&employee_id=" + employee_id +
            "&position=" + position + 
            "&date_from=" + date_from + 
            "&date_to=" + date_to
        ,{})
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}
