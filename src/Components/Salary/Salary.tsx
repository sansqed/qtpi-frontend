import "./Salary.css"
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { getAttendance } from "../../ApiCalls/EmployeesApi";
import { getAdvance } from "../../ApiCalls/AdvanceApi";

interface SalaryProps{
    employee_id: string;
    rate: number;
    payout: string;
}


const Salary:React.FC<SalaryProps> = ({employee_id, rate, payout}) => {
    const { RangePicker } = DatePicker
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState<Dayjs>(payout==="monthly"?  dayjs().startOf("month"):dayjs().startOf("week"))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs())
    const [salaryEntry, setSalaryEntry] = useState(["",0])
    
    
    const columns: any = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            width: "30%",
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            width: "40%",
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            width: "30%",
        },
    ];

    useEffect(()=>{
        getAttendance(employee_id, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
        .then((response)=>{
            console.log(response.data.data.attendance)
            var totalAttendance = 0.0

            response.data.data.attendance.map((a:any)=>{
                console.log(a.status)        
                if(a.status == "present")
                    totalAttendance += 1
                else if(a.status === "halfday")
                    totalAttendance += 0.5
            })

            console.log(totalAttendance)
            setSalaryEntry([String(totalAttendance) + " days x " + String(rate), 
                totalAttendance*rate]) 
        })
    },[])


    const [summary, setSummary] = useState({
        gross: 2500,
        less: 1000,
        net: 1500
    })

    const buildData = () => {
        return([
            {
                item: 'Salary',
                details: salaryEntry[0],
                amount: Number(salaryEntry[1]),
                type: "salary"
            },
            {
                item: 'SSS',
                details: "",
                amount: '-1000',
                type: "less"
            },
            {
                item: 'Advance',
                details: "",
                amount: '-1500',
                type: "less"
            }])
    }

    return(
        <div className="salary-container">
            <div className="salary-header-container">
                <h2 className="salary-title">
                    SALARY
                </h2>
            </div>

            <div className="salary-date-range-container">
                <text className="salary-range-label">
                    From
                </text>
                <RangePicker 
                    className="salary-rangepicker"
                    size={"small"} 
                    defaultValue={[dayjs().startOf("week"), dayjs().endOf("week")]}
                    style={{ width: '65%'}}
                    format={"MMM DD YYYY"}
                    separator={"to"}
                    bordered={false}
                />
            </div>

            <div className="salary-body">
                <Table
                    loading={isLoading}
                    columns={columns} 
                    dataSource={buildData()}
                    size="small"
                    pagination={false}
                    bordered={false}
                    summary={() => (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1} align="right">Gross</Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="right">{summary.gross}</Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1} align="right">Less</Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="right">{summary.less}</Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1} align="right"><b>NET SALARY</b></Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="right"><b>{summary.net}</b></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )} 
                />
            </div>
        </div>
    )
}

export default Salary;