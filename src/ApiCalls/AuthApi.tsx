import { getRequester, getToken } from "../Helpers/UserFunctions"
import { postAPICall, URL } from "./CommonApi"



export const LoginApi = async(username: string, password: string) => {
    try {
        const response = await postAPICall(URL+"Authentications/login", {
            username: username,
            password: password
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error.response.data };
    }
}

export const CheckUserSession = async()=>{
    try {
        const response = await postAPICall(URL+"authentications/check_user_session", {
            requester: getRequester(),
            token: getToken(),
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}
