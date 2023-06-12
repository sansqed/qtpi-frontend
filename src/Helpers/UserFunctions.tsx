import dayjs from "dayjs";
import { Toaster, toast } from 'react-hot-toast';
import { tokenExpiryConfig } from "./ToasterConfig";

export const IsLoggedIn = () => {
    try {
        if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined)
            return false
        

        let expiry = JSON.parse(localStorage.getItem("token_expiry") || "")
        if (expiry==="" || dayjs().isAfter(dayjs(expiry))){
            toast.error("Token expired. Please login again", tokenExpiryConfig)
            return false
        }

        return true
        
    }catch(error) {
        return false
    }
}

export const getToken = () => {
    try{

        return JSON.parse(localStorage.getItem("token") || "")
    } catch {
        return ""
    }
}

export const getRequester = () => {
    return localStorage.getItem("requester")
}

export const getUserFullName = () => {
    return localStorage.getItem("user-name") || ""
}

export const getRoleId = () => {
    return JSON.parse(localStorage.getItem("role_id")|| "") 
}