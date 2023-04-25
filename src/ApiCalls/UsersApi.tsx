import { postAPICall, URL } from "./CommonApi"
import User from "../Types/User"

export const getUsers = async(user_id?:string)=>{
    try {
        const response = await postAPICall(URL+"users/get", {
            user_id: user_id,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}

export const createUser = async(user:User)=>{
    try {
        const response = await postAPICall(URL+"users/create", {
            requester: 1,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            role_id: 1,
            contact_no: user.contact_no,
            address: user.address,
            username: user.username,
            password: user.password,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}

export const updateUser = async(user:User)=>{
    try {
        const response = await postAPICall(URL+"users/update/"+String(user.id), {
            requester: 1,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            role_id: 1,
            contact_no: user.contact_no,
            address: user.address,
            username: user.username,
            password: user.password,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}

export const deleteUser = async(user_id:string) => {
    try {
        const response = await postAPICall(URL+"users/delete/"+String(user_id), {
            requester: 1
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}