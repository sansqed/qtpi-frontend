import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"

var token = getToken()
var requester = getRequester()



export const getExpenseDetails = async(expense_id:string,classification_id:string) => {
    try {
        const response = await getAPICall(URL+"expense_details/get?"+
            "requester="+requester+
            "&token="+token+
            "&expense_id="+ expense_id+
            "&classification_id="+ classification_id
        ,{
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}
