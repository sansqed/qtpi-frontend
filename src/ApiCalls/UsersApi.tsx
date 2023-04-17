import { postAPICall, URL } from "./CommonApi"

export const getUsers = async(userid?:string)=>{
    try {
        const response = await postAPICall(URL+"users/get", {
            user_id: userid,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}