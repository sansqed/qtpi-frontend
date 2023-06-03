import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"

var token = getToken()
var requester = getRequester()

export const getSalary = async(employee_id:string, date_from:string, date_to:string) => {
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
