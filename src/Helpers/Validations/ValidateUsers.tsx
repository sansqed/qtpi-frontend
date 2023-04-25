import User from "../../Types/User";
import { setErrorTrue } from "./Common"

const ValidateUsers = (user:User, setError:Function) => {
    let isValid = true;
    if (user.confirm_password !== user.password || user.password === ""){
        setErrorTrue("password", true, setError);
        isValid = false
    } else {
        setErrorTrue("password", false, setError);
    }
    
    if (user.first_name === ""){
        setErrorTrue("first_name", true, setError)
        isValid = false
    } else {
        setErrorTrue("first_name", false, setError);
    }

    if (user.last_name === ""){
        setErrorTrue("last_name", true, setError)
        isValid = false
    } else {
        setErrorTrue("last_name", false, setError);
    }

    if (user.username === ""){
        setErrorTrue("username", true, setError)
        isValid = false
    } else {
        setErrorTrue("username", false, setError);
    }

    // if (user.role_id === ""){
    //     setErrorTrue("role_id", setError)
    //     isValid = false
    // }

    // if (user.contact_no === ""){
    //     setErrorTrue("contact_no", setError)
    //     isValid = false
    // }



    return isValid
};

export default ValidateUsers;