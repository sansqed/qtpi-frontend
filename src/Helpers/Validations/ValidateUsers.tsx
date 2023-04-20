import User from "../../Types/User";
import { setErrorTrue } from "./Common"

const ValidateUsers = (user:User, setError:Function) => {
    let isValid = true;
    if (user.confirm_password !== user.password || user.password === ""){
        setErrorTrue("password", setError);
        isValid = false
    }
    
    if (user.first_name === ""){
        setErrorTrue("first_name", setError)
        isValid = false
    }

    if (user.last_name === ""){
        setErrorTrue("last_name", setError)
        isValid = false
    }

    if (user.username === ""){
        setErrorTrue("username", setError)
        isValid = false
    }

    if (user.role_id === ""){
        setErrorTrue("role_id", setError)
        isValid = false
    }

    if (user.contact_no === ""){
        setErrorTrue("contact_no", setError)
        isValid = false
    }



    return isValid
};

export default ValidateUsers;