import Sidebar from "../../Components/Sidebar/Sidebar";
import Button from "../../Components/Button/Button";
import { getNewExpense } from "../../Types/Expense";
import ExpenseTable from "../../Components/ExpenseTable/ExpenseTable";
import toasterConfig from "../../Helpers/ToasterConfig";
import { moneyFormatter } from "../../Helpers/Util";
import "./Expenses.css" 
import ExpenseExportExcel from "../../Components/ExpenseExportExcel/ExpenseExportExcel";
import { AppName } from "../../Helpers/Util";

import {DatePicker, Tabs} from "antd";
import React,{ useState, useEffect  } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

import { getClassifications } from "../../ApiCalls/ClassificationsApi";
import { getExpenses, createExpenses, deleteExpenses, updateExpenses } from "../../ApiCalls/ExpensesApi";

import type ExpenseType from "../../Types/Expense";


const Expenses = () => {
    const { RangePicker } = DatePicker

    const [startDate, setStartDate] = useState<Dayjs>(dayjs())
    const [endDate, setEndDate] = useState<Dayjs>(dayjs())
    const [classifications, setClassifications] = useState<any[]>([])
    const [expenses, setExpenses] = useState<ExpenseType[]>([])
    const [selectedExpenseId, setSelectedExpenseId] = useState<string>("")
    const [selectedExpense, setSelectedExpense] = useState<ExpenseType>(getNewExpense("-1"))
    const [toRefresh, setToRefresh] = useState(false)

    const handleDateChange = (range:any) => {
        setStartDate(range[0])
        setEndDate(range[1])
    }

    const handleExpenseSelect = (e:any)=>{
        setSelectedExpenseId(e.target.value)
        const selected:any = expenses.find(({id}:any)=>e.target.value===id)
        setSelectedExpense(selected)
        console.log(selected.date_from)
        setStartDate(selected.date_from)
        setEndDate(selected.date_to)
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
                let expenseResponse = response.data.data.expense.map((e:any)=>{
                    return({...e, 
                        date_from: dayjs(e.date_from +" 00:00"), 
                        date_to: e.date_to==="0000-00-00"? undefined:dayjs(e.date_to +" 00:00"), 
                        expense_name: "Grow "+e.id
                    })
                })
                
                const lastExpense = expenseResponse[expenseResponse.length - 1]
                if(selectedExpenseId===""){
                    setSelectedExpense(lastExpense)
                    setSelectedExpenseId(lastExpense.id)
                    setStartDate(lastExpense.date_from)
                    setEndDate(lastExpense.date_to)
                }
                
                expenseResponse.push(getNewExpense(lastExpense.id))
                setExpenses(expenseResponse)
            })
        setToRefresh(false)
    },[toRefresh])

    const handleCreateExpense = () =>{
        if(startDate !== undefined && endDate !== undefined){
            createExpenses(startDate.format("YYYY-MM-DD"), "")
                .then((response)=>{
                    console.log(response)
                    toast.success(response.data.message, toasterConfig);
                    setToRefresh(true)
                })
        } else{
            toast.error("Set start date of grow", toasterConfig)
        }
    }

    const handleDeleteExpense = ()=>{
        deleteExpenses(selectedExpenseId)
            .then((response)=>{
                console.log(response)
                toast.success(response.data.message, toasterConfig);
                setToRefresh(true)
            })

    }

    const handleUpdateExpense = () => {
        updateExpenses(selectedExpenseId, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
            .then((response)=>{
                console.log(response)
                toast.success(response.data.message, toasterConfig);
                setToRefresh(true)
            })
    }

    return(
        <div className="expenses-container">
            <Helmet>
                <title>Grow {selectedExpenseId} - {AppName}</title>
            </Helmet>
            <div className="expenses-wrapper">            
                <Sidebar/>

                <div className="expenses-main-container">
                    <div className="expenses-header">
                        <h1>EXPENSES</h1>
                        <h2>Grow</h2>
                        <div className="button">
                            <Form.Select     
                                className="expenses-grow-menu"
                                value={selectedExpenseId}
                                onChange={e=>handleExpenseSelect(e)}
                            >
                                <option value="" disabled>Select grow</option>
                                {expenses.map(({id, expense_name}:any)=>{return(<option value={id} id={id}>{expense_name}</option>)})}
                                {/* <option value="new">{"New: grow " + String(Number(selectedExpenseId)+Number(1))}</option> */}
                            </Form.Select>
                        </div>
                        <div className="expenses-date-range-container">
                            <text className="expenses-range-label">
                            From
                            </text>
                            <RangePicker
                                className="expenses-rangepicker"
                                size={"small"} 
                                value={[startDate, endDate]}
                                placeholder={["Set start date", "Set end date"]}
                                style={{ width: '13vw'}}
                                format={"MMM DD YYYY"}
                                separator={"to"}
                                bordered={false}
                                onCalendarChange={(e:any)=>handleDateChange(e)}
                            />
                            <div className="expenses-grow-btn-container">
                                {
                                    selectedExpense?.isNew?
                                    <Button
                                        type="expenses-create-grow"
                                        handleClick={handleCreateExpense}
                                    />:
                                    <Button
                                        type="expenses-set-date"
                                        handleClick={handleUpdateExpense}
                                    />
                                }
                            </div>                     
                        </div>
                    </div>

                    <div className="expenses-selects-container">
                        <Tabs defaultActiveKey = "1">
                            {classifications? classifications.map(({id, name}) => 
                                <Tabs.TabPane tab = {name} key = {id}>
                                    <ExpenseTable
                                        classification_id={id}
                                        expense={selectedExpense}
                                        setExpenseToRefresh={setToRefresh}
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
                        <div className="expenses-summary-export-btn-wrapper">
                            <Button
                                type="expense-export"
                                handleClick={()=>{}}
                                // handleClick={()=>ExpenseExportExcel()}
                            />
                        </div>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Labor</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.labor))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Chemicals/Fly Control</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.chemicals))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Fuels & Lubricants</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.fuels))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Utilities</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.utilities))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Supplies</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.supplies))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Repair & Maintenance</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.repair))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Rentals (Equipments / Vehicle)</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.rentals))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Taxes / Licenses</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.taxes))}</text>
                    </div>
                    <div className="expenses-summary-section">
                        <h4 className="expenses-summary-name">Others</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.others))}</text>
                    </div>
                    <div className="expenses-summary-section total">
                        <h4 className="expenses-summary-name">TOTAL</h4>
                        <text className="expenses-summary-value">{moneyFormatter.format(Number(selectedExpense?.total_amount))}</text>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Expenses;
