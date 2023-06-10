import Employee from "../../Types/Employee";
import { setErrorTrue } from "./Common"

const ValidateEmployees = (employee:Employee, setError:Function) => {
    let isValid = true;
    // if (user.confirm_password !== user.password || user.password === ""){
    //     setErrorTrue("password", true, setError);
    //     isValid = false
    // } else {
    //     setErrorTrue("password", false, setError);
    // }
    
    if (employee.first_name === "" || /\d/.test(employee.first_name)){
        setErrorTrue("first_name", true, setError)
        isValid = false
    } else {
        setErrorTrue("first_name", false, setError);
    }

    if (/\d/.test(employee.middle_name)){
        setErrorTrue("middle_name", true, setError)
        isValid = false
    } else {
        setErrorTrue("middle_name", false, setError);
    }

    if (employee.last_name === "" || /\d/.test(employee.last_name)){
        setErrorTrue("last_name", true, setError)
        isValid = false
    } else {
        setErrorTrue("last_name", false, setError);
    }

    if (employee.address === ""){
        setErrorTrue("address", true, setError)
        isValid = false
    } else {
        setErrorTrue("address", false, setError);
    }

    if (employee.contact_no === ""){
        setErrorTrue("contact_no", true, setError)
        isValid = false
    } else {
        setErrorTrue("contact_no", false, setError);
    }

    if (employee.position_id === ""){
        setErrorTrue("position", true, setError)
        isValid = false
    } else {
        setErrorTrue("position", false, setError);
    }

    if (employee.rate === "" || Number(employee.rate) <= 0){
        setErrorTrue("rate", true, setError)
        isValid = false
    } else {
        setErrorTrue("rate", false, setError);
    }

    if (employee.SSS !== "" && Number(employee.SSS) <= 0){
        setErrorTrue("SSS", true, setError)
        isValid = false
    } else {
        setErrorTrue("SSS", false, setError);
    }

    if (employee.payout === ""){
        setErrorTrue("payout", true, setError)
        isValid = false
    } else {
        setErrorTrue("payout", false, setError);
    }
    



    return isValid
};

export default ValidateEmployees;
