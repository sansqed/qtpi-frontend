import React from 'react'
import { useEffect, useState } from "react";
import { DatePicker, Table, Form, Input, InputNumber, Popconfirm, Typography, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import "./ExpenseTable.css"
import { formatMoney } from '../../Helpers/Util';

import { getExpenseItems } from '../../ApiCalls/ExpenseItemsApi';
import { getExpenseDetails, createExpenseDetails, updateExpenseDetails, deleteExpenseDetails } from "../../ApiCalls/ExpenseDetailsApi";


import type ExpenseDetailType from "../../Types/ExpenseDetail";
import type ExpenseItemType from '../../Types/ExpenseItem';

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
    expense_id: string;
    setToRefresh: Function
}

const ExpenseTable:React.FC<ExpenseProps> = ({classification_id, expense_id, setToRefresh}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState<ExpenseDetailType[]>([])
    const [newItemId, setNewItemId] = useState(-1)
    const [editingId, setEditingId] = useState('');
    const isEditing = (record: ExpenseDetailType) => record.expense_detail_id === editingId || record.id === editingId;
    const [totalExpense, setTotalExpense] = useState(0)
    const [editMode, setEditMode] = useState("")
    const [items, setItems] = useState<ExpenseItemType[]>([])
    const [refreshFlag, setRefreshFlag] = useState(0)

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
                /> : inputType === 'qty'?
                <InputNumber 
                    controls={false}
                    className='expense-table-qty-input'
                /> : inputType === 'date'? 
                <DatePicker 
                    format={"MMM DD YYYY"}
                /> : inputType==='select'? 
                <Select 
                    showSearch 
                    optionFilterProp="children" 
                    options={items?.map(({id, name})=>{return {value: id, label: name}})}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                /> : <Input autoComplete="off"/>;
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
                inputType==="date"? record.expense_date.format("MMM DD YYYY"):
                    inputType==="money"? formatMoney(String(children)):
            children
            )}
        </td>
        );
    };


    

    const columns: any = [
        {
            title: 'Date',
            dataIndex: 'expense_date',
            key: 'expense_date',
            width: "15%",
            editable: true,
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
            width: "5%",
            editable: true,
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center',
            width: "10%",
            editable: true,
        },
        {
            title: 'Name',
            dataIndex: 'expense_item_name',
            key: 'expense_item_name',
            align: 'left',
            width: "40%",
            editable: true,
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            key: 'unit_price',
            align: 'right',
            width: "10%",
            editable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            width: "10%",
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
                  <Typography.Link onClick={() => save(record.expense_detail_id)} style={{ marginRight: 8 }}>
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
        deleteExpenseDetails(expense_id, classification_id, item)
        setRefreshFlag(refreshFlag+1)
        setEditingId('');
        setToRefresh(true)
    }

    const save = async (id: string) => {
        try{
            let row = (await form.validateFields()) as ExpenseDetailType
        
            if (editMode === "add") {              
                row.expense_item_id = row.expense_item_name
                const findItemName = items.find(({id})=>id===row.expense_item_name)?.name

                if (findItemName)
                    row.expense_item_name = String(findItemName)

                console.log("add", row)
                createExpenseDetails(expense_id, classification_id, row)
                    .then(response=>{
                        console.log(response)
                    })
                setRefreshFlag(refreshFlag+1)
                setEditingId('');
                setToRefresh(true)
            } else if (editMode === "edit"){

                // row.expense_item_id = row.expense_item_name
                row.expense_detail_id = editingId
                const findItemId = items.find(({name})=>name===row.expense_item_name)?.id

                if (findItemId)
                    row.expense_item_id = String(findItemId)

                console.log(row)

                updateExpenseDetails(expense_id, classification_id, row)
                    .then(response=>{
                        console.log(response)
                    })
                setRefreshFlag(refreshFlag+1)
                setEditingId('');
                setToRefresh(true)
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
        getExpenseDetails(expense_id,classification_id)
            .then((response)=>{
                console.log(response.data.data)
                let tempTotal = 0
                const details = response.data.data.expense_details.map((e:any)=>{
                    tempTotal += Number(e.amount)
                    return({
                        ...e, 
                        expense_date: dayjs(e.expense_date),
                        qty: Number(e.qty),
                        unit_price: Number(e.unit_price),
                        amount: Number(e.amount)
                    })
                })

                setData(details)
                setTotalExpense(tempTotal)
            })
        getExpenseItems("", classification_id)
            .then((response)=>{
                console.log(response)
                setItems(response.data.data.expense_item)
            })
    },[expense_id, refreshFlag])

    

    const onItemChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      
      const onItemSearch = (value: string) => {
        console.log('search:', value);
      };

    const mergedColumns = columns.map((col:any) => {
        if (!col.editable)
            return {...col}

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
            <button onClick={handleAddItem}>
                Add item
            </button>
            <Form form={form} component={false} className='expense-table-wrapper'>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    // loading={isLoading}
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
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={3}></Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="right"><b>Total</b></Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align="right"><b>{totalExpense}</b></Table.Summary.Cell>
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