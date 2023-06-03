import Sidebar from "../../Components/Sidebar/Sidebar";
import Button from "../../Components/Button/Button";

import {DatePicker, Tabs} from "antd";

import "./Expenses.css" 
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Form } from "react-bootstrap";



const Expenses = () => {
    const { RangePicker } = DatePicker

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))
    
    const handleDateChange = (range:any) => {
        setStartDate(range[0])
        setEndDate(range[1])
    }

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
                        >
                            <option value="" disabled>Grow</option>
                            <option value="1">Grow 1</option>
                            <option value="2">Grow 2</option>
                        </Form.Select>
                        </div>
                        <h2>Date Range</h2>
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
                        <Tabs defaultActiveKey = "LABOR">
                            <Tabs.TabPane tab = "LABOR" key = "LABOR">
                                <div> test1</div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab = "CHEMICALS/FLY CONTROL" key = "tab2">
                                <div> test2</div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab = "FUELS & LUBRICANT" key = "tab3">
                                <div> test3</div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab = "UTILITIES" key = "tab4">
                                <div> test4</div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab = "SUPPLIES" key = "tab5">
                                <div> test5</div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                {/* <Button
                    type="add-employee"
                    handleClick={()=>{}}
                /> */}
                </div>



                <div className="expenses-dashboard-container">
                    <div className="expenses-dashboard-container-header">
                        <h1>TOTAL EXPENSES</h1>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Expenses;
