export const isLoggedIn = () => {

    return localStorage.getItem("token")!=="undefined"? true:false
    // return true
}
