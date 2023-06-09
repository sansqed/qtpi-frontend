import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"
import ExpenseType from "../Types/Expense"

var token = getToken()
var requester = getRequester()

export const getExpenses = async(id:string, date_from:string, date_to:string) => {
    try {
        const response = await getAPICall(URL+"expenses/get?"+
            "requester="+requester+
            "&token="+token+
            "&id="+id+
            "&date_from="+ date_from+
            "&date_to="+ date_to
        ,{
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const createExpenses = async(date_from:string, date_to:string) => {
    try {
        const response = await postAPICall(URL+"expenses/create",{
            requester: requester,
            token: token,
            date_from: date_from,
            date_to: date_to
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const deleteExpenses = async(expense_id:string) => {
    try {
        const response = await postAPICall(URL+"expenses/delete/"+expense_id,{
            requester: requester,
            token: token,
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const updateExpenses = async(expense_id:string, date_from: string, date_to:string) => {
    try {
        const response = await postAPICall(URL+"expenses/update/"+expense_id,{
            requester: requester,
            token: token,
            date_from: date_from,
            date_to: date_to
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}
