import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"

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
