import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"

var token = getToken()
var requester = getRequester()

export const getClassifications = async() => {
    try {
        const response = await getAPICall(URL+"classifications/get?"+
            "requester="+requester+
            "&token="+token
        ,{
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}
