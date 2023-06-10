import { getAPICall, postAPICall, URL } from "./CommonApi"
import { getRequester, getToken } from "../Helpers/UserFunctions"
import ExpenseType from "../Types/ExpenseDetail"

var token = getToken()
var requester = getRequester()



export const getExpenseDetails = async(expense_id:string,classification_id:string) => {
    try {
        const response = await getAPICall(URL+"expense_details/get?"+
            "requester="+requester+
            "&token="+token+
            "&expense_id="+ expense_id+
            "&classification_id="+ classification_id
        ,{
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}


export const createExpenseDetails = async(expense_id:string,classification_id:string, expense:ExpenseType) => {
    try {
        const response = await postAPICall(URL+"expense_details/create",{
            requester: requester,
            token: token,
            expense_id: expense_id,
            classification_id: classification_id,
            expense_date_from: [expense.expense_date_from.format("YYYY-MM-DD")],
            expense_date_to: [expense.expense_date_to? expense.expense_date_to.format("YYYY-MM-DD"):null],
            qty: [expense.qty],
            unit: [expense.unit],
            unit_price: [expense.unit_price],
            expense_item_id: [expense.expense_item_id]
            
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const updateExpenseDetails = async(expense_id:string,classification_id:string, expense:ExpenseType) => {
    try {
        const response = await postAPICall(URL+"expense_details/update",{
            requester: requester,
            token: token,
            expense_id: expense_id,
            classification_id: classification_id,
            expense_detail_id: [expense.expense_detail_id],
            expense_date_from: [expense.expense_date_from.format("YYYY-MM-DD")],
            expense_date_to: [expense.expense_date_to? expense.expense_date_to.format("YYYY-MM-DD"):null],
            qty: [expense.qty],
            unit: [expense.unit],
            unit_price: [expense.unit_price],
            expense_item_id: [Number(expense.expense_item_id)]
            
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}

export const deleteExpenseDetails = async(expense_id:string,classification_id:string, expense:ExpenseType) => {
    try {
        const response = await postAPICall(URL+"expense_details/delete",{
            requester: requester,
            token: token,
            expense_id: expense_id,
            classification_id: classification_id,
            expense_detail_id: [expense.expense_detail_id || expense.id],
        })
        return { data: response.data};
    } catch (error:any) {
        return { data: error };
    }
}
