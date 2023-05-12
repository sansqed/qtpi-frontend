import "./Advance.css"
import Button from "../Button/Button";
import { DatePicker, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface DataType {
    id: string;
    item: string;
    date: number;
    amount: string;
 }

const Advance = () => {
    const { RangePicker } = DatePicker

    const columns: any = [
        {
          title: 'Item',
          dataIndex: 'item',
          key: 'item',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          width: 150
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          align: 'right',
          width: 100
        },
      ];

    const data = [
        {
            id: '1',
            item: 'Cash',
            date: 'Jan 1 2023',
            amount: '1500'
        },
        {
            id: '2',
            item: 'Cash',
            date: 'Jan 1 2023',
            amount: '1500'
        },
        {
            id: '1',
            item: 'Cash',
            date: 'Jan 1 2023',
            amount: '1500'
        },
        {
            id: '2',
            item: 'Cash',
            date: 'Jan 1 2023',
            amount: '1500'
        },
        {
            id: '1',
            item: 'Cash',
            date: 'Jan 1 2023',
            amount: '1500'
        },
        {
            id: '2',
            item: 'Cash',
            date: 'Jan 1 2023',
            amount: '1500'
        },
        // {
        //     id: '1',
        //     item: 'Cash',
        //     date: 'Jan 1 2023',
        //     amount: '1500'
        // },
        // {
        //     id: '2',
        //     item: 'Cash',
        //     date: 'Jan 1 2023',
        //     amount: '1500'
        // },
        // {
        //     id: '1',
        //     item: 'Cash',
        //     date: 'Jan 1 2023',
        //     amount: '1500'
        // },
        // {
        //     id: '2',
        //     item: 'Cash',
        //     date: 'Jan 1 2023',
        //     amount: '1500'
        // },
    ]

    const handleAddAdvance = () => {}

    return(
        <div className="advance-container">
            <div className="advance-header-container">
                <h2 className="advance-title">
                    ADVANCE
                </h2>
                <div className="advance-add-btn-wrapper">
                    <Button
                        type="add-advance"
                        handleClick={handleAddAdvance}
                    />
                </div>
            </div>
            <div className="advance-date-range-container">
                <text className="advance-range-label">
                    From
                </text>
                <RangePicker 
                    className="advance-rangepicker"
                    size={"small"} 
                    defaultValue={[dayjs().startOf("week"), dayjs().endOf("week")]}
                    style={{ width: '70%', color: "#003459"}}
                    format={"MMM DD YYYY"}
                    separator={"to"}
                    bordered={false}
                />
            </div>

            <div className="advance-table-container">
                <Table 
                    className="advance-table"
                    columns={columns} 
                    dataSource={data} 
                    // scroll={{ x: 1500 }}
                    size="small"
                    summary={() => (
                        <Table.Summary fixed>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align="right"><b>Total</b></Table.Summary.Cell>
                            <Table.Summary.Cell index={2} align="right"><b>3,000</b></Table.Summary.Cell>
                          </Table.Summary.Row>
                        </Table.Summary>
                      )}
                    sticky
                    // pagination={}
                />
            </div>
        </div>
    )
}

export default Advance;