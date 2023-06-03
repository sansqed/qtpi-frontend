import "./Salary.css"
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography } from 'antd';
import dayjs, { Dayjs, } from 'dayjs';
import { useEffect, useState } from 'react';

import { getAttendance } from "../../ApiCalls/EmployeesApi";
import { getAdvance } from "../../ApiCalls/AdvanceApi";
import { formatMoney } from "../../Helpers/Util";

interface SalaryProps{
    employee_id: string;
    rate: number;
    payout: string;
    isDetailsChanged: boolean;
    setIsDetailsChanged: Function
    hasSSS: boolean
    sss?: number
}


const Salary:React.FC<SalaryProps> = ({employee_id, rate, payout, isDetailsChanged, setIsDetailsChanged, hasSSS, sss}) => {
    const { RangePicker } = DatePicker
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState<Dayjs>(payout==="monthly"?  dayjs().startOf("month"):dayjs().startOf("week"))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs())
    const [salaryEntry, setSalaryEntry] = useState(["",0])
    const [totalAdvance, setTotalAdvance] = useState(0)
    
    
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

                setSalaryEntry([String(totalAttendance) + " days x " + String(rate), 
                    totalAttendance*rate])
                    
                setIsDetailsChanged(false)
            })
            .catch(()=>{
                setSalaryEntry(["",0])
            })

        getAdvance(employee_id, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
            .then((response)=>{
                console.log(response.data.data.advance)
                var total = 0
                response.data.data.advance.map((a:any)=>{
                    total += Number(a.amount)
                })
                setTotalAdvance(total)
            })
            .catch(()=>{
                setTotalAdvance(0)
            })
    },[isDetailsChanged, startDate, endDate])


    const handleDateChange = (range:any) => {
        if (dayjs(range[1]).isAfter(dayjs(range[0]))){
            setStartDate(range[0])
            setEndDate(range[1])
        }

        
    }

    const [summary, setSummary] = useState({
        gross: 2500,
        less: 1000,
        net: 1500
    })

    const buildData = () => {
        let tempData = [
            {
                item: 'Salary',
                details: salaryEntry[0],
                amount: formatMoney(salaryEntry[1]),
                type: "salary"
            },
            {
                item: 'Advance',
                details: "",
                amount: formatMoney(totalAdvance),
                type: "less"
            }]
        
        if (!Number.isNaN(sss))
            tempData.push({
                item: 'SSS',
                details: "",
                amount: String(sss),
                type: "less"
            })

        return(tempData)
    }

    const buildLess = () => {
        if(sss)
            return -(sss+totalAdvance)
        return -totalAdvance
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
                    defaultValue={[startDate, endDate]}
                    style={{ width: '65%'}}
                    format={"MMM DD YYYY"}
                    separator={"to"}
                    bordered={false}
                    onCalendarChange={e=>handleDateChange(e)}
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
                                <Table.Summary.Cell index={2} align="right">{formatMoney(salaryEntry[1])}</Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1} align="right">Less</Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="right">{formatMoney(buildLess())}</Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1} align="right"><b>NET SALARY</b></Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="right"><b>{formatMoney(Number(salaryEntry[1])+buildLess())}</b></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )} 
                />
            </div>
        </div>
    )
}

export default Salary;