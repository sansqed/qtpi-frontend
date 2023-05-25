import "./Advance.css"
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { numberWithCommas } from "../../Helpers/Util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type AdvanceType from "../../Types/Advance"
import { getAdvance, updateAdvance, createAdvance, deleteAdvance } from "../../ApiCalls/AdvanceApi";

import dayjs, { Dayjs } from 'dayjs';

    interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
        editing: boolean;
        dataIndex: string;
        title: any;
        inputType: 'number' | 'text' | 'date';
        record: AdvanceType;
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
                    dataIndex==="amount"? "₱"+numberWithCommas(children):
            children
            )}
        </td>
        );
    };
  
interface AdvanceProps{
    employee_id: string;
}
const Advance:React.FC<AdvanceProps> = ({employee_id}) => {
    const { RangePicker } = DatePicker
    let pageSize = 5
    const [currPage, setCurrPage] = useState(1)
    const [newItemId, setNewItemId] = useState(-1)
    // const [dateRange, setDateRange] = useState<Dayjs[]>([dayjs().startOf("week"), dayjs().endOf("week")])
    const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))
    
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState('');
    const isEditing = (record: AdvanceType) => record.id === editingId;
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        getAdvance(employee_id, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
        .then((response)=>{
            console.log(response)
        })
    },[])

    const edit = (record: Partial<AdvanceType> & { id: string }) => {
        form.setFieldsValue({ item: '', date: dayjs(), amount: '', ...record });
        setEditingId(String(record.id));
    };

    const cancel = () => {
        setEditingId('');
    };

    const handleDeleteItem = async(item:AdvanceType) => {
        deleteAdvance(item)
            .then(response=>{
                console.log(response)
            })
    }

    const save = async (id: string) => {
        try {
          let row = (await form.validateFields()) as AdvanceType
            
          const newData = [...data];
          const index = newData.findIndex((item) => id === item.id);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            row.employee_id = employee_id
            
            createAdvance(row)
                .then((response)=>{
                    console.log(response)
                })

            setData(newData);
            setEditingId('');
          } else {
            row.employee_id = employee_id
            newData.push(row);
            console.log(row)
            setData(newData);
            setEditingId('');

            updateAdvance(row)
                .then((response)=>{
                    console.log(response)
                })
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
    

    const columns: any = [
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            width: 150,
            editable: true,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
            editable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            width: 100,
            editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
            editable: false,
            align: 'center',
            render: (_: any, record: AdvanceType) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                    Save
                  </Typography.Link>
                  <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
                    Cancel
                  </Typography.Link>
                </span>
              ) : (
                <>
                    <Typography.Link disabled={editingId !== ''} onClick={() => edit(record)} className="advance-operation">
                        Edit
                    </Typography.Link>

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteItem(record)}>
                        <Typography.Link disabled={editingId !== ''} className="advance-operation" type="danger">
                            Delete
                        </Typography.Link>
                    </Popconfirm>
                </>
                
              );
            },
          },
      ];

    const [data, setData] = useState<AdvanceType[]>([
        // {
        //     id: '1',
        //     details: 'Cash',
        //     date: dayjs("2023-01-01"),
        //     amount: '1500',
        //     employee_id: employee_id
        // },
        // {
        //     id: '2',
        //     details: 'Cash',
        //     date: dayjs("2023-01-01"),
        //     amount: '1500',
        //     employee_id: employee_id
        // },
        // {
        //     id: '3',
        //     details: 'Cash',
        //     date: dayjs("2023-01-01"),
        //     amount: '1500',
        //     employee_id: employee_id
        // },
        // {
        //     id: '4',
        //     details: 'Cash',
        //     date: dayjs("2023-01-01"),
        //     amount: '1500',
        //     employee_id: employee_id
        // },
        // {
        //     id: '5',
        //     details: 'Cash',
        //     date: dayjs("2023-01-01"),
        //     amount: '1500',
        //     employee_id: employee_id
        // },
        // {
        //     id: '6',
        //     details: 'Cash',
        //     date: dayjs("2023-01-01"),
        //     amount: '1500',
        //     employee_id: employee_id
        // },
    ])
    const [isLastPage, setIsLastPage] = useState(Math.ceil(data.length/pageSize) === currPage)
    const handleAddAdvance = () => {

        const newData = {
            id: String(newItemId),
            employee_id: employee_id,
            details: "",
            date: dayjs(),
            amount: ""
        }

        setData(([...data, newData]))
        setCurrPage(Math.ceil(data.length+1/pageSize))
        setIsLastPage(true)
        edit(newData)
        setNewItemId(newItemId-1)
    }

    const handlePageChange = (page:number) => {
        setCurrPage(page)
        Math.ceil(data.length/pageSize)===page? setIsLastPage(true):setIsLastPage(false) 
    }

    const mergedColumns = columns.map((col:any) => {
        if (!col.editable)
            return {...col}
        
        // if (col.dataIndex==="date")
            console.log(col)
            // return {
            //     ...col,
            //     onCell: (record: Item) => ({
            //     record,
            //     inputType: col.dataIndex === 'amount' ? 'number' :  col.dataIndex === 'date' ? 'date':'text',
            //     dataIndex: col.dataIndex,
            //     title: col.title,
            //     editing: isEditing(record),
            //     }),
            // };

        return {
          ...col,
          onCell: (record: AdvanceType) => ({
            record,
            inputType: col.dataIndex === 'amount' ? 'number' :  col.dataIndex === 'date' ? 'date':'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
    });

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
                    defaultValue={[startDate, endDate]}
                    style={{ width: '65%'}}
                    format={"MMM DD YYYY"}
                    separator={"to"}
                    bordered={false}
                />
            </div>

            <div className="advance-table-container">
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        loading={isLoading}
                        className="advance-table"
                        columns={mergedColumns} 
                        dataSource={data} 
                        pagination={{ 
                            pageSize: pageSize, 
                            position: ["bottomCenter"],
                            onChange: (page)=>{handlePageChange(page)},
                            current: currPage
                        }}
                        size="small"
                        sticky
                        summary={() => (
                            isLastPage?
                            <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1} align="right"><b>Total</b></Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="right"><b>3,000</b></Table.Summary.Cell>
                            </Table.Summary.Row>
                            </Table.Summary>
                            :null
                        )}
                        // pagination={}
                    />
                </Form>
            </div>
        </div>
    )
}

export default Advance;