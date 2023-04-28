import { getAPICall, postAPICall, URL } from "./CommonApi"
import Employee from "../Types/Employee"
import { getRequester, getToken } from "../Helpers/UserFunctions"

var token = getToken()
var requester = getRequester()

export const getEmployees = async(employee_id?:string)=>{
    
    
    if (employee_id == undefined)
        employee_id = ""

    try {
        const response = await getAPICall(URL+"employees/get?requester="+requester+"&token="+token+"&employee_id="+employee_id, {
        } )
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}

export const createEmployee = async(employee:Employee)=>{
    try {
        const response = await postAPICall(URL+"employees/create", {
            requester: requester,
            token: token,
            first_name: employee.first_name,
            middle_name: employee.middle_name,
            last_name: employee.last_name,
            // role_id: 1,
            contact_no: employee.contact_no,
            address: employee.address,
            position: employee.position,
            rate: employee.rate,
            rate_unit: employee.rate_unit,
            // sss: employee.sss,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}

// export const updateUser = async(employee:employee)=>{
//     try {
//         const response = await postAPICall(URL+"users/update/"+String(employee.id), {
//             requester: 1,
//             first_name: employee.first_name,
//             middle_name: employee.middle_name,
//             last_name: employee.last_name,
//             role_id: 1,
//             contact_no: employee.contact_no,
//             address: employee.address,
//             username: employee.username,
//             password: employee.password,
//         })
//         return { data: response.data};
//     } catch (error) {
//         return { data: error };
//     }
// }

export const deleteEmployee = async(employee_id:string) => {
    try {
        const response = await postAPICall(URL+"employees/delete/"+String(employee_id), {
            requester: requester,
            token: token,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}
