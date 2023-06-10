import "./Advance.css"
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatMoney } from "../../Helpers/Util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type AdvanceType from "../../Types/Advance"
import { getAdvance, updateAdvance, createAdvance, deleteAdvance } from "../../ApiCalls/AdvanceApi";

import { moneyFormatter } from "../../Helpers/Util";

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

interface AdvanceProps{
    employee_id: string;
    payout?: string;
    setIsDetailsChanged:Function
}

const Advance:React.FC<AdvanceProps> = ({employee_id, payout, setIsDetailsChanged}) => {

    const { RangePicker } = DatePicker
    let pageSize = 5
    const [currPage, setCurrPage] = useState(1)
    const [newItemId, setNewItemId] = useState(-1)
    const [startDate, setStartDate] = useState<Dayjs>(payout==="monthly"?  dayjs().startOf("month"):dayjs().startOf("week"))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs())
    const [totalAdvance, setTotalAdvance] = useState(0)
    
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState('');
    const isEditing = (record: AdvanceType) => record.id === editingId;
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<AdvanceType[]>([])
    const [isChanged, setIsChanged] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)
    const [editMode, setEditMode] = useState('')

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
        let amount = Number(Form.useWatch("amount", form))
        if(dataIndex === "amount" && Array.isArray(children))
            children = children[1]
        const inputNode = inputType === 'number' ? 
            <InputNumber 
                prefix="₱" 
                min={1}
                status= {amount<=0? "error":""}
                controls={false}
            /> : inputType === 'date'? 
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
                dataIndex==="advance_date"? record.advance_date.format("MMM DD YYYY"):
                    dataIndex==="amount"?moneyFormatter.format(Number(children)):
                        children
            )}
        </td>
        );
    };

    useEffect(()=>{
        setIsLoading(true)
        getAdvance(employee_id, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
        .then((response)=>{
            console.log(response)
            let total = 0
            let advances = response.data.data.advance.map((a:any)=>{
                total += Number(a.amount)
                return({...a, advance_date: dayjs(a.advance_date)})
            })
            setData(advances)
            setIsChanged(false)
            setIsLoading(false)
            setTotalAdvance(total)
            setIsLastPage(Math.ceil(response.data.data.advance.length/pageSize) === currPage)
        }).catch(()=>{
            setIsLoading(false)
            setData([])
            setTotalAdvance(0)
            setIsLastPage(false)
        })
    },[startDate, endDate, isChanged])

    const edit = (record: Partial<AdvanceType> & { id: string }) => {
        form.setFieldsValue({ item: '', advance_date: dayjs(), amount: '', ...record });
        setEditingId(String(record.id));
        setEditMode("edit")
    };

    const cancel = () => {
        setIsChanged(true)
        setEditingId('');
        if(editMode === 'add')
            setData(data.slice(0, -1))
    };

    const handleDeleteItem = async(item:AdvanceType) => {
        deleteAdvance(item)
            .then(response=>{
                setIsChanged(true)
                setIsDetailsChanged(true)
            })
    }

    const save = async (id: string) => {
        try {
          let row = (await form.validateFields()) as AdvanceType
            
          if (editMode === "edit") {
            row.employee_id = employee_id
            row.id = editingId

            updateAdvance(row)
                .then((response)=>{
                    setIsChanged(true)
                    setIsDetailsChanged(true)
                    setEditingId('');
                })
          } else if(editMode === "add") {

            row.employee_id = employee_id
            
            createAdvance(row)
            .then((response)=>{
                    setEditingId('')
                    setIsChanged(true)
                    setIsDetailsChanged(true)
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
            width: "30%",
            editable: true,
        },
        {
            title: 'Date',
            dataIndex: 'advance_date',
            key: 'advance_date',
            width: "30%",
            editable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            width: "20%",
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

    
    const handleAddAdvance = () => {

        const newData = {
            id: String(newItemId),
            employee_id: employee_id,
            details: "",
            advance_date: dayjs(),
            amount: ""
        }

        setData(([...data, newData]))
        setCurrPage(Math.ceil(data.length+1/pageSize))
        setIsLastPage(true)
        edit(newData)
        setNewItemId(newItemId-1)
        setEditMode('add')
    }

    const handlePageChange = (page:number) => {
        setCurrPage(page)
        Math.ceil(data.length/pageSize)===page? setIsLastPage(true):setIsLastPage(false) 
    }

    const handleDateChange = (range:any) => {
        if(dayjs(range[1]).isAfter(dayjs(range[0]))){
            setStartDate(range[0])
            setEndDate(range[1])
        }
    }

    const mergedColumns = columns.map((col:any) => {
        if (!col.editable)
            return {...col}

        return {
          ...col,
          onCell: (record: AdvanceType) => ({
            record,
            inputType: col.dataIndex === 'amount' ? 'number' :  col.dataIndex === 'advance_date' ? 'date':'text',
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
                        onCalendarChange={e=>handleDateChange(e)}
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
                                <Table.Summary.Cell index={2} align="right"><b>{formatMoney(totalAdvance)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell index={3}></Table.Summary.Cell>
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