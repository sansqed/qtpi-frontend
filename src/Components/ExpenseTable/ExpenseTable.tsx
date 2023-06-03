import { useEffect } from "react";
import { getExpenseDetails } from "../../ApiCalls/ExpenseDetails";
import ExpenseType from "../../Types/Expenses";
import { DatePicker, Input, InputNumber, Form } from "antd";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'date';
    record: ExpenseType;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? 
        <InputNumber prefix="₱" controls={false}/> : inputType === 'date'? 
            <DatePicker format={"MMM DD YYYY"}/>:<Input autoComplete="off"/>;
    return (
    <td {...restProps}>
        {editing ? (
        <Form.Item  
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
            {
                required: true,
                message: "",
            },
            ]}
        >
            {inputNode}
        </Form.Item>
        ) : (
            dataIndex==="date"? record.date.format("MMM DD YYYY"):
                // dataIndex==="amount"? "₱"+numberWithCommas(String(children)):
        children
        )}
    </td>
    );
};

interface ExpenseProps{
    classification_id: string;
}

const ExpenseTable:React.FC<ExpenseProps> = ({classification_id}) => {
    useEffect (()=>{
        getExpenseDetails("1",classification_id)
    },[])

    return(
        <div>

    </div>
    )
}

export default ExpenseTable;