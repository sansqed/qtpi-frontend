import React, { ReactNode } from 'react'
import { useEffect, useState } from "react";
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import "./ExpenseTable.css"
import { formatMoney, moneyFormatter } from '../../Helpers/Util';
import CreatableSelect from 'react-select/creatable';
import Button from '../Button/Button';
import { toast } from "react-hot-toast";
import toasterConfig from "../../Helpers/ToasterConfig";

import { getExpenseItems, createExpenseItems } from '../../ApiCalls/ExpenseItemsApi';
import { getExpenseDetails, createExpenseDetails, updateExpenseDetails, deleteExpenseDetails } from "../../ApiCalls/ExpenseDetailsApi";


import type ExpenseDetailType from "../../Types/ExpenseDetail";
import type ExpenseItemType from '../../Types/ExpenseItem';
import type ExpenseType from '../../Types/Expense';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'qty' | 'money' | 'text' | 'date' | 'select';
    record: ExpenseDetailType;
    index: number;
    children: React.ReactNode;
}

interface ExpenseProps{
    classification_id: string;
    expense: ExpenseType;
    setExpenseToRefresh: Function;
    setExpenseData :Function;
}

const ExpenseTable:React.FC<ExpenseProps> = ({classification_id, expense, setExpenseToRefresh, setExpenseData}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState<ExpenseDetailType[]>([])
    const [newItemId, setNewItemId] = useState(-1)
    const [editingId, setEditingId] = useState('');
    const isEditing = (record: ExpenseDetailType) => record.expense_detail_id === editingId || record.id === editingId;
    const [totalExpense, setTotalExpense] = useState(0)
    const [editMode, setEditMode] = useState("")
    const [items, setItems] = useState<ExpenseItemType[]>([])
    const [toRefresh, setToRefresh] = useState(false)

    const [currPage, setCurrPage] = useState(1)
    const pageSize = 13
    const [isLastPage, setIsLastPage] = useState(false)
    const { RangePicker } = DatePicker

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
        let qty=0, unit_price=0, name=""
        qty = Form.useWatch("qty", form)
        unit_price = Form.useWatch("unit_price", form)
        name = Form.useWatch("expense_item_name", form)?.label
        if (inputType==="money" && Array.isArray(children))
            children = children[1]
        const inputNode = inputType === 'money' ?  
                <InputNumber 
                    
                    prefix="₱" 
                    controls={false}
                    name='unit-price-form'
                    status={unit_price<=0? "error":""}
                /> : inputType === 'qty'?
                <InputNumber 
                    controls={false}
                    className='expense-table-qty-input'
                    name='qty-form'
                    status={qty<=0? "error":""}
                /> : inputType === 'date' && (name==="Labor" || record.expense_item_name==="Labor")? 
                <RangePicker
                    size={"small"} 
                    format={"MMM DD YYYY"}
                    defaultValue={[record.expense_date_from, record?.expense_date_to]}
                    separator=""
                    className='expense-table-rangepicker'
                />:
                inputType === 'date'? 
                <DatePicker 
                    format={"MMM DD YYYY"}
                /> : inputType==='select'? 
                <CreatableSelect
                    isClearable
                    options={buildOptions()}
                    className='expense-table-dropdown'
                    styles={{ menuPortal: base => ({ ...base, zIndex: 100000000 }) }}
                    defaultInputValue={record.expense_item_name}
                /> : <Input autoComplete="off"/>;

        
        return (
        <td {...restProps}>
            {
            editing? 
            dataIndex === "amount"? moneyFormatter.format(qty*unit_price):
            (
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
                {
                    inputNode
                }
            </Form.Item>
            ) : (
                inputType==="date" && record.expense_item_name==="Labor"? <>{record.expense_date_from.format("MMM DD YYYY")} - {record.expense_date_to?.format("MMM DD YYYY")}</>:
                inputType==="date"? record.expense_date_from.format("MMM DD YYYY"):
                    dataIndex==="amount"? moneyFormatter.format(Number(children)):
                    inputType==="money"? moneyFormatter.format(Number(children)): 
                    inputType==="select"? record.expense_item_name:children
            )}
        </td>
        );
    };

    const buildOptions = () =>{
        let options = items?.map(({id, name})=>{return {value: id, label: name}})
        // options.push({value: '-1', label: "Enter to create"})
        return options
    }



    const columns: any = [
        {
            title: 'Date',
            dataIndex: 'expense_date',
            key: 'expense_date',
            width: classification_id==="1"? "25%":"17%",
            editable: true,
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
            width: "8%",
            editable: true,
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            align: 'left',
            width: "10%",
            editable: true,
        },
        {
            title: 'Item',
            dataIndex: 'expense_item_name',
            key: 'expense_item_name',
            align: 'left',
            width: "30%",
            editable: true,
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            key: 'unit_price',
            align: 'right',
            width: "13%",
            editable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            width: "13%",
            // editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
            editable: false,
            align: 'center',
            width: "10%",
            render: (_: any, record: ExpenseDetailType) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link onClick={() => save(record.expense_detail_id)} style={{ marginRight: 8 }} className="advance-operation">
                    Save
                  </Typography.Link>
                  <Typography.Link onClick={cancel} style={{ marginRight: 8 }} className="advance-operation">
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
    ]

    const handleAddItem = () => {
        const newData = {
            expense_detail_id: String(newItemId),
            expense_date_from: dayjs(),
            expense_date_to: null,
            qty: 0,
            unit: "",
            expense_item_id:"",
            expense_item_name:"",
            unit_price: 0,
            amount: 0
        }

        setData(([...data, newData]))
        setCurrPage(Math.ceil(data.length+1/pageSize))
        setIsLastPage(true)
        form.setFieldsValue({ advance_date: dayjs(), ...newData });
        setEditingId(String(newData.expense_detail_id));
        setNewItemId(newItemId-1)
        setEditMode("add")
    }

    const edit = (record: Partial<ExpenseDetailType>) => {
        // console.log(record)
        form.setFieldsValue({ item: '', advance_date: dayjs(), amount: '', ...record });
        setEditingId(String(record.id));
        setEditMode("edit")
    };

    const cancel = () => {
        // setIsChanged(true)
        if (editMode==="add"){
            setData(data.slice(0, -1))
        }
        setEditingId('');
    };
    const handleDeleteItem = async(item:ExpenseDetailType) => {
        // console.log(item)
        deleteExpenseDetails(expense.id, classification_id, item)
        setToRefresh(true)
        setEditingId('');
        setExpenseToRefresh(true)
    }

    const save = async (id: string) => {
        toast.loading("Saving entry", toasterConfig)
        try{
            let row = (await form.validateFields())
            console.log(row)
            let newItemId = -1

            if (row.expense_item_name?.__isNew__){
                createExpenseItems(row.expense_item_name.label, classification_id)
                    .then((response)=>{
                        newItemId = response.data.expense_item_id
                    })
                    .then(()=>{
                        if (editMode === "add") {              
                            row.expense_item_id = newItemId
                            row.expense_date_from = row.expense_date
                            row.expense_date_to = undefined
                            
                            console.log("add new", row)
                            
                            createExpenseDetails(expense.id, classification_id, row)
                                .then(response=>{
                                    console.log(response)
                                    toast.success("Entry successfully added", toasterConfig)
                                })
                            setToRefresh(true)
                            setEditingId('');
                            setExpenseToRefresh(true)
                        } else if (editMode === "edit"){
                            row.expense_detail_id = editingId
                            row.expense_item_id = newItemId
                            row.expense_date_from = row.expense_date
                            row.expense_date_to = undefined

                            // console.log(row)

                            updateExpenseDetails(expense.id, classification_id, row)
                                .then(response=>{
                                    toast.success("Entry successfully added", toasterConfig)
                                })
                            setToRefresh(true)
                            setEditingId('');
                            setExpenseToRefresh(true)
                        }
                    })
            } else {
                if (editMode === "add") {              
                    row.expense_item_id = row.expense_item_name
                    row.expense_item_name = row.expense_item_name.label
                    row.expense_item_id = row.expense_item_id.value

                    if(row.expense_item_name === "Labor"){
                        row.expense_date_from = row.expense_date[0]
                        row.expense_date_to = row.expense_date[1]
                    } else{
                        row.expense_date_from = row.expense_date
                        row.expense_date_to = undefined
                    }
    
                    // console.log("add", row)
                    createExpenseDetails(expense.id, classification_id, row)
                        .then(response=>{
                            // console.log(response)
                            toast.success("Entry successfully added", toasterConfig)
                        })
                    setToRefresh(true)
                    setEditingId('');
                    setExpenseToRefresh(true)
                } else if (editMode === "edit"){

                    row.expense_detail_id = editingId
                    if(typeof row.expense_item_name === "string")
                        row.expense_item_id = items.find((i)=>{return(i.name===row.expense_item_name)})?.id
                    else{
                        row.expense_item_id = row.expense_item_name.value
                        row.expense_item_name = row.expense_item_name.label
                    }

                    if(row.expense_item_name === "Labor"){
                        row.expense_date_from = row.expense_date[0]
                        row.expense_date_to = row.expense_date[1]
                    } else{
                        row.expense_date_from = row.expense_date
                        row.expense_date_to = undefined
                    }
                        
                    // console.log(id, editingId, row)
                    updateExpenseDetails(expense.id, classification_id, row)
                        .then(response=>{
                            // console.log(response)
                            toast.success("Entry successfully added", toasterConfig)
                        })

                    setToRefresh(true)
                    setEditingId('');
                    setExpenseToRefresh(true)
                }
                else{
                    // console.log("none")
                    toast.error("Entry details invalid", toasterConfig)
                    
                }
            }

        
        } catch (errInfo) {
            // console.log('Validate Failed:', errInfo);
        }
    }

    const handlePageChange = (page:number) => {
        setCurrPage(page)
        Math.ceil(data.length/pageSize)===page? setIsLastPage(true):setIsLastPage(false) 
    }

    useEffect (()=>{
        getExpenseDetails(expense.id,classification_id)
            .then((response)=>{
                // console.log(response)
                let tempTotal = 0
                const details = response.data.data.expense_details.map((e:any)=>{
                    tempTotal += Number(e.amount)
                    return({
                        ...e, 
                        expense_item: {id: e.expense_item_id, name: e.expense_item_name},
                        expense_date_from: dayjs(e.expense_date_from),
                        expense_date_to: dayjs(e.expense_date_to),
                        qty: Number(e.qty),
                        unit_price: Number(e.unit_price),
                        amount: Number(e.amount)
                    })
                })
                // console.log(details)
                setData(details)
                setTotalExpense(tempTotal)
                if (details.length < pageSize)
                    setIsLastPage(true)
                setExpenseData((prev:any)=>({...prev, classification_id: response.data.data.expense_details}))
            })
            .catch((reason)=>{
                setData([])
                setTotalExpense(0)
                setIsLastPage(false)
            })
        getExpenseItems("", classification_id)
            .then((response)=>{
                // console.log(response)
                let items = response.data.data.expense_item
                // items.push({id: '', value: "Enter to create item"})
                setItems(items)
            })
            .catch(()=>{
                setItems([])
                setIsLastPage(false)
            })

        setToRefresh(false)
    },[expense, toRefresh])

    const mergedColumns = columns.map((col:any) => {
        if(col.dataIndex === "amount")
            return {
                ...col,
                onCell: (record: ExpenseDetailType) => ({
                record,
                inputType: 
                    col.dataIndex === 'amount' || col.dataIndex === 'unit_price' ? 
                        'money' : col.dataIndex === 'qty'? 
                            'qty' : col.dataIndex === 'expense_date' ? 
                            'date': col.dataIndex === 'expense_item_name'? 'select':'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                })
            }

        if (!col.editable)
            return {
                ...col,
                onCell: (record: ExpenseDetailType) => ({
                  record,
                  inputType: 
                      col.dataIndex === 'amount' || col.dataIndex === 'unit_price' ? 
                          'money' : col.dataIndex === 'qty'? 
                              'qty' : col.dataIndex === 'expense_date' ? 
                              'date': col.dataIndex === 'expense_item_name'? 'select':'text',
                  dataIndex: col.dataIndex,
                  title: col.title,
                //   editing: false,
                })
            }

        return {
          ...col,
          onCell: (record: ExpenseDetailType) => ({
            record,
            inputType: 
                col.dataIndex === 'amount' || col.dataIndex === 'unit_price' ? 
                    'money' : col.dataIndex === 'qty'? 
                        'qty' : col.dataIndex === 'expense_date' ? 
                        'date': col.dataIndex === 'expense_item_name'? 'select':'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
    });

    return(
        <div className={'expense-table-container'}>
            <div className='expenses-add-item-wrapper'>
                <Button
                    type='expenses-add-item'
                    handleClick={handleAddItem}
                    disabled={expense.isNew}
                />
            </div>
            <Form form={form} component={false} className='expense-table-wrapper'>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    // loading={isLoading}
                    scroll={data.length>16? { y:"65vh"}:{}}
                    className="expenses-table"
                    columns={mergedColumns} 
                    dataSource={data} 
                    pagination={false}
                    size="small"
                    sticky
                    summary={() => (
                        <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={3}></Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="right"><b>Total</b></Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align="right"><b>{moneyFormatter.format(totalExpense)}</b></Table.Summary.Cell>
                            <Table.Summary.Cell index={6}></Table.Summary.Cell>
                        </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />
            </Form>
        </div>
    )
}

export default ExpenseTable;