import dayjs, { Dayjs } from "dayjs";

type ExpenseType = {
    id: string;
    expense_name: string;
    date_from: Dayjs | undefined;
    date_to: Dayjs | undefined;
    labor: string;
    chemicals: string;
    fuels: string;
    utilities: string;
    supplies: string;
    repair: string;
    rentals: string;
    taxes: string;
    others: string;
    total_amount: string;
    isNew: boolean;
}

export const getNewExpense = (lastId:string) =>{
    return({
        id: String(Number(lastId)+1),
        expense_name: "Create Grow " + String(Number(lastId)+1),
        date_from: undefined,
        date_to: undefined,
        labor: "--",
        chemicals: "--",
        fuels: "--",
        utilities: "--",
        supplies: "--",
        repair: "--",
        rentals: "--",
        taxes: "--",
        others: "--",
        total_amount: "--",
        isNew: true,
    })
}


export default ExpenseType;