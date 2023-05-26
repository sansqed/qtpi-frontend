import "./Salary.css"
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

interface Item {
    item: string;
    details: string;
    amount: string;
    type: string;
}

const Salary = () => {
    const { RangePicker } = DatePicker
    const [isLoading, setIsLoading] = useState(false)

    const columns: any = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            width: "35%",
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            width: "35%",
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            width: "30%",
        },
    ];

    const [data, setData] = useState([
        {
            item: 'Cash',
            details: "5 day(s) x ₱700",
            amount: '3500',
            type: "salary"
        },
        {
            item: 'Overtime',
            details: "5 day(s) x ₱700",
            amount: '3500',
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
        },
    ])

    const [summary, setSummary] = useState({
        gross: 2500,
        less: 1000,
        net: 1500
    })

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
                    dataSource={data}
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