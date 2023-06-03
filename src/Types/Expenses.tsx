import { Dayjs } from "dayjs";

type ExpenseType = {
    id: string;
    date: Dayjs;
    quantity: number;
    unit: string;
    name: string;
    unitPrice: number;
    amount: string;
    
}


export default ExpenseType;