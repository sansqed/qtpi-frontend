import Sidebar from "../../Components/Sidebar/Sidebar";
import Button from "../../Components/Button/Button";

import {Tabs} from "antd";

import "./Expenses.css" 

const Expenses = () => {
    return(
        <div className="expenses-container">

            <div className="expenses-wrapper">            
                <Sidebar/>

                <div className="expenses-main-container">
                    <div className="expenses-header">
                        <h1>EXPENSES</h1>
                        <h2>Grow</h2>
                        <div className="button">
                        <Button
                            type="date-range"
                            handleClick={()=>{}}
                        />
                        </div>
                        <h2>Date Range</h2>
                        <div className="button">
                        <Button
                            type="date-range"
                            handleClick={()=>{}}
                        />
                        </div>
                        <h2>→</h2>
                        <div className="button">
                        <Button
                            type="date-range"
                            handleClick={()=>{}}
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
