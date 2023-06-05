import Sidebar from "../../Components/Sidebar/Sidebar";
import Button from "../../Components/Button/Button";

import {DatePicker, Tabs} from "antd";

import "./Expenses.css" 
import React,{ useState, useEffect  } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Form } from "react-bootstrap";
import { getClassifications } from "../../ApiCalls/ClassificationsApi";
import ExpenseTable from "../../Components/ExpenseTable/ExpenseTable";
import { getExpenses } from "../../ApiCalls/ExpensesApi";


const Expenses = () => {
    const { RangePicker } = DatePicker

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))
    const [classifications, setClassifications] = useState<any[]>([])
    const [expenses, setExpenses] = useState<any>([])
    const [selectedExpenseId, setSelectedExpenseId] = useState<any>("")
    const [selectedExpense, setSelectedExpense] = useState<any>()
    const [toRefresh, setToRefresh] = useState(false)

    const handleDateChange = (range:any) => {
        setStartDate(range[0])
        setEndDate(range[1])
    }

    const handleExpenseSelect = (e:any)=>{
        setSelectedExpenseId(e.target.value)
        const selected:any = expenses.find(({id}:any)=>e.target.value===id)
        setSelectedExpense(selected)
        console.log(selected?.date_from)
        setStartDate(dayjs(selected?.date_from))
        setEndDate(dayjs(selected?.date_to))
    }
    
    console.log(selectedExpense)

    useEffect(()=>{
        getClassifications()
        .then((response)=>{
            console.log(response)
            setClassifications(response.data.data.classifications)
        })
        getExpenses("","", "")
            .then((response)=>{
                console.log(response.data.data.expense)
                setExpenses(response.data.data.expense)
            })
    },[toRefresh])
    return(
        <div className="expenses-container">

            <div className="expenses-wrapper">            
                <Sidebar/>

                <div className="expenses-main-container">
                    <div className="expenses-header">
                        <h1>EXPENSES</h1>
                        <h2>Grow</h2>
                        <div className="button">
                        <Form.Select     
                            className="grow-menu"
                            defaultValue={selectedExpenseId}
                            onChange={e=>handleExpenseSelect(e)}
                        >
                            <option value="" disabled>Select grow</option>
                            {expenses.map(({id}:any)=>{return(<option value={id} id={id}>{"Grow "+ id}</option>)})}
                        </Form.Select>
                        </div>
                        {/* <h2>Date Range</h2> */}
                        <div className="advance-date-range-container">
                        <text className="advance-range-label">
                        From
                        </text>
                        <RangePicker
                            className="advance-rangepicker"
                            size={"small"} 
                            defaultValue={[startDate, endDate]}
                            style={{ width: '65%'}}
                            format={"MMM DD YYYY"}
                            separator={"to"}
                            bordered={false}
                            onCalendarChange={e=>handleDateChange(e)}
                        />
            </div>
                    </div>

                    <div className="expenses-selects-container">
                        <Tabs defaultActiveKey = "1">
                            {classifications? classifications.map(({id, name}) => 
                                <Tabs.TabPane tab = {name} key = {id}>
                                    <ExpenseTable
                                        classification_id={id}
                                        expense_id={selectedExpenseId}
                                        setToRefresh={setToRefresh}
                                    />
                                </Tabs.TabPane>
                            ):<></>}
                        </Tabs>
                    </div>
                {/* <Button
                    type="add-employee"
                    handleClick={()=>{}}
                /> */}
                </div>



                <div className="expenses-summary-container">
                    <div className="expenses-summary-container-header">
                        <h2>TOTAL EXPENSES</h2>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Labor</h4>
                        <text className="expenses-summary-value">{selectedExpense?.labor}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Chemicals/Fly Control</h4>
                        <text className="expenses-summary-value">{selectedExpense?.chemicals}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Fuels & Lubricants</h4>
                        <text className="expenses-summary-value">{selectedExpense?.fuels}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Utilities</h4>
                        <text className="expenses-summary-value">{selectedExpense?.utilities}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Supplies</h4>
                        <text className="expenses-summary-value">{selectedExpense?.supplies}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Repair & Maintenance</h4>
                        <text className="expenses-summary-value">{selectedExpense?.repair}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Rentals (Equipments / Vehicle)</h4>
                        <text className="expenses-summary-value">{selectedExpense?.rentals}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Taxes / Licenses</h4>
                        <text className="expenses-summary-value">{selectedExpense?.taxes}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Others</h4>
                        <text className="expenses-summary-value">{selectedExpense?.others}</text>
                    </div>
                    <div className="expenses-summary-section total">
                        <h4 className="expenses-summary-name">TOTAL</h4>
                        <text className="expenses-summary-value">{selectedExpense?.total_amount}</text>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Expenses;
