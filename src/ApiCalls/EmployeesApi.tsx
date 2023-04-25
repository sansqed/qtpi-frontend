import { postAPICall, URL } from "./CommonApi"
import Employee from "../Types/Employee"

export const getEmployees = async(employee_id?:string)=>{
    try {
        const response = await postAPICall(URL+"employees/get", {
            employee_id: employee_id,
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}

// export const createUser = async(user:User)=>{
//     try {
//         const response = await postAPICall(URL+"users/create", {
//             requester: 1,
//             first_name: user.first_name,
//             middle_name: user.middle_name,
//             last_name: user.last_name,
//             role_id: 1,
//             contact_no: user.contact_no,
//             address: user.address,
//             username: user.username,
//             password: user.password,
//         })
//         return { data: response.data};
//     } catch (error) {
//         return { data: error };
//     }
// }

// export const updateUser = async(user:User)=>{
//     try {
//         const response = await postAPICall(URL+"users/update/"+String(user.id), {
//             requester: 1,
//             first_name: user.first_name,
//             middle_name: user.middle_name,
//             last_name: user.last_name,
//             role_id: 1,
//             contact_no: user.contact_no,
//             address: user.address,
//             username: user.username,
//             password: user.password,
//         })
//         return { data: response.data};
//     } catch (error) {
//         return { data: error };
//     }
// }

export const deleteEmployee = async(employee_id:string) => {
    try {
        const response = await postAPICall(URL+"employees/delete/"+String(employee_id), {
            requester: 1
        })
        return { data: response.data};
    } catch (error) {
        return { data: error };
    }
}