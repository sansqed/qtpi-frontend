import { postAPICall, URL } from "./CommonApi"

export const LoginApi = async(username: string, password: string) => {
    try {
        const response = await postAPICall(URL+"", {
            username: username,
            password: password
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}

export const getUsers = async(userid?:string)=>{
    try {
        const response = await postAPICall(URL+"", {
            user_id: userid,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}