import { Dayjs } from "dayjs";

type ExpenseDetailType = {
    id?: string;
    expense_detail_id: string;
    expense_date_from: Dayjs;
    expense_date_to: Dayjs|null;
    qty: number;
    unit: string;
    expense_item_id: string;
    expense_item_name: string;
    unit_price: number;
    amount: number;
    
}


export default ExpenseDetailType;