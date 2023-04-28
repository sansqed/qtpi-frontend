export const isLoggedIn = () => {

    // try {(localStorage.getItem("token"))
    //     return true
    // }catch(error) {
    //     return false
    // }
    if (localStorage.getItem("token") === null)
        return false
    else
        return true
        
    // localStorage.getItem("token")!==null? true:false
    // return true
}

export const getToken = () => {
    try {(localStorage.getItem("token"))
        return JSON.parse(localStorage.getItem("token") ||"")
    }catch(error) {
        return false
    }
        
    // return localStorage.getItem("token") !== undefined?JSON.parse(localStorage.getItem("token") ||""):null
    // return true
}

export const getRequester = () => {
    try {(localStorage.getItem("requester"))
        return localStorage.getItem("requester")
    }catch(error) {
        return false
    }
    // return localStorage.getItem("requester") !== undefined?JSON.parse(localStorage.getItem("requester") ||""):null
    // // return true
}