import { Dayjs } from "dayjs";

type AdvanceType = {
    id: string;
    details: string;
    advance_date: Dayjs;
    amount: string;
    employee_id: string
}


export default AdvanceType;