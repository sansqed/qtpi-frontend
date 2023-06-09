import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"
import ExpenseType from "../Types/ExpenseDetail"

var token = getToken()
var requester = getRequester()


export const getExpenseItems = async(expense_item_id:string, classification_id:string) => {
    try {
        const response = await getAPICall(URL+"expense_items/get?"+
            "requester="+requester+
            "&token="+token+
            "&id="+ expense_item_id+
            "&classification_id="+ classification_id
        ,{
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const createExpenseItems = async(name:string, classification_id:string) => {
    try {
        const response = await postAPICall(URL+"expense_items/create",{
            requester: requester,
            token: token,
            name: name,
            classification_id: classification_id
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}
