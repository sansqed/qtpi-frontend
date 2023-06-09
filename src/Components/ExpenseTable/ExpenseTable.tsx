import React, { ReactNode } from 'react'
import { useEffect, useState } from "react";
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import "./ExpenseTable.css"
import { formatMoney, moneyFormatter } from '../../Helpers/Util';
import CreatableSelect from 'react-select/creatable';
import Button from '../Button/Button';

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
}

const ExpenseTable:React.FC<ExpenseProps> = ({classification_id, expense, setExpenseToRefresh}) => {
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
        const inputNode = inputType === 'money' ?  
                <InputNumber 
                    prefix="₱" 
                    controls={false}
                    name='unit-price-form'
                /> : inputType === 'qty'?
                <InputNumber 
                    controls={false}
                    className='expense-table-qty-input'
                    name='qty-form'
                /> : inputType === 'date'? 
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

        let qty = Form.useWatch("qty", form)
        let unit_price = Form.useWatch("unit_price", form)
        if (inputType==="money" && Array.isArray(children))
            children = children[1]

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
                inputType==="date"? record.expense_date.format("MMM DD YYYY"):
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
            width: "17%",
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
            title: 'Name',
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
            width: "15%",
            editable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            width: "15%",
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
            expense_date: dayjs(),
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
        console.log(record)
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
        console.log(item)
        deleteExpenseDetails(expense.id, classification_id, item)
        setToRefresh(true)
        setEditingId('');
        setExpenseToRefresh(true)
    }

    const save = async (id: string) => {
        console.log("here")
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
                            console.log("add", row)
                            createExpenseDetails(expense.id, classification_id, row)
                                .then(response=>{
                                    console.log(response)
                                })
                            setToRefresh(true)
                            setEditingId('');
                            setExpenseToRefresh(true)
                        } else if (editMode === "edit"){
                            // row.expense_item_id = row.expense_item_name
                            row.expense_detail_id = editingId
                            row.expense_item_id = newItemId
                            console.log(row)

                            updateExpenseDetails(expense.id, classification_id, row)
                                .then(response=>{
                                    console.log(response)
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
    
                    console.log("add", row)
                    createExpenseDetails(expense.id, classification_id, row)
                        .then(response=>{
                            console.log(response)
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
                        
                    console.log(id, editingId, row)
                    updateExpenseDetails(expense.id, classification_id, row)
                        .then(response=>{
                            console.log(response)
                        })

                    setToRefresh(true)
                    setEditingId('');
                    setExpenseToRefresh(true)
                }
                else{
                    console.log("none")
                }
            }

        
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const handlePageChange = (page:number) => {
        setCurrPage(page)
        Math.ceil(data.length/pageSize)===page? setIsLastPage(true):setIsLastPage(false) 
    }

    useEffect (()=>{
        getExpenseDetails(expense.id,classification_id)
            .then((response)=>{
                console.log(response)
                let tempTotal = 0
                const details = response.data.data.expense_details.map((e:any)=>{
                    tempTotal += Number(e.amount)
                    return({
                        ...e, 
                        expense_item: {id: e.expense_item_id, name: e.expense_item_name},
                        expense_date: dayjs(e.expense_date),
                        qty: Number(e.qty),
                        unit_price: Number(e.unit_price),
                        amount: Number(e.amount)
                    })
                })
                console.log(details)
                setData(details)
                setTotalExpense(tempTotal)
                if (details.length <= pageSize)
                    setIsLastPage(true)
            })
            .catch((reason)=>{
                setData([])
                setTotalExpense(0)
            })
        getExpenseItems("", classification_id)
            .then((response)=>{
                console.log(response)
                let items = response.data.data.expense_item
                // items.push({id: '', value: "Enter to create item"})
                setItems(items)
            })
            .catch(()=>{
                setItems([])
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
                    className="expenses-table"
                    columns={mergedColumns} 
                    dataSource={data} 
                    pagination={{ 
                        pageSize: pageSize, 
                        position: ["bottomCenter"],
                        onChange: (page:any)=>{handlePageChange(page)},
                        current: currPage
                    }}
                    size="small"
                    sticky
                    summary={() => (
                        isLastPage?
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
                        :null
                    )}
                />
            </Form>
        </div>
    )
}

export default ExpenseTable;