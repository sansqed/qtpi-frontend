export const isLoggedIn = () => {

    return localStorage.getItem("token")!=="undefined"? true:false
    // return true
}

export const getToken = () => {

    return JSON.parse(localStorage.getItem("token")||"")
    // return true
}

export const getRequester = () => {

    return localStorage.getItem("requester")
    // return true
}