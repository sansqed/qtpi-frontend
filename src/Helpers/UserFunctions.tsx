export const isLoggedIn = () => {

    try {
        if (localStorage.getItem("token") === null)
            return false
        else
            return true
    }catch(error) {
        return false
    }
    
        
    // localStorage.getItem("token")!==null? true:false
    // return true
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem("token") ||"")
}

export const getRequester = () => {
    return localStorage.getItem("requester")
}