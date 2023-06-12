import dayjs from "dayjs";
import { Toaster, toast } from 'react-hot-toast';
import { tokenExpiryConfig } from "./ToasterConfig";
import { CheckUserSession } from "../ApiCalls/AuthApi";
import { useState } from "react";

export const IsLoggedIn = async() => {
    
    const [loggedIn, setLoggedIn] = useState(true)

    try {
        if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined){
            return false
        }

        let expiry = JSON.parse(localStorage.getItem("token_expiry") || "")
        if (expiry==="" || dayjs().isAfter(dayjs(expiry))){
            toast.dismiss()
            toast.error("User session expired. \nPlease login again.", tokenExpiryConfig)
            return false
        }

        if(loggedIn){
            CheckUserSession()
                .then((response)=>{
                    if (response.data.status !== 200){
                        toast.dismiss()
                        toast.error("User session expired. \nPlease login again", tokenExpiryConfig)
                        setLoggedIn(false)
                    } 
                })
                .catch(()=>{
                    setLoggedIn(false)
                })
        }
        
        return loggedIn
        
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