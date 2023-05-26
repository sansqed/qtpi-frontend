import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"
import type AdvanceType from "../Types/Advance"

var token = getToken()
var requester = getRequester()

export const getAdvance = async(employee_id:string, date_from:string, date_to:string) => {
    try {
        const response = await getAPICall(URL+"advances/get?"+
            "requester="+requester+
            "&token="+token+
            "&id="+
            "&employee_id="+employee_id+
            "&date_from="+ date_from+
            "&date_to="+ date_to
        ,{
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const createAdvance = async(advance:AdvanceType) => {
    try {
        const response = await postAPICall(URL+"advances/create",{
            requester: requester,
            token: token,
            employee_id: advance.employee_id,
            details: advance.details,
            date: advance.date.format("YYYY-MM-DD"),
            amount: String(advance.amount)
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const updateAdvance = async(advance:AdvanceType) => {
    try {
        const response = await postAPICall(URL+"advances/update/"+advance.id,{
            requester: requester,
            token: token,
            employee_id: advance.employee_id,
            details: advance.details,
            date: advance.date.format("YYYY-MM-DD"),
            amount: advance.amount
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const deleteAdvance = async(advance:AdvanceType) => {
    try {
        const response = await postAPICall(URL+"advances/delete/"+advance.id,{
            requester: requester,
            token: token,
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}