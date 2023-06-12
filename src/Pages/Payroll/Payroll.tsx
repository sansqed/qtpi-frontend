// local imports
import Button from "../../Components/Button/Button";
import Sidebar from "../../Components/Sidebar/Sidebar";
import PayrollDetailType from "../../Types/PayrollDetail";
import Payroll2PDF from "../../Helpers/Exporters/Payroll2PDF";
import { createPayroll, getPayroll } from "../../ApiCalls/PayrollApi";

// helper imports
import { moneyFormatter } from "../../Helpers/Util";

// external imports
import { DatePicker, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useEffect, useCallback } from "react";
import Select, { components, OptionProps } from 'react-select';
import { toast } from "react-hot-toast";
import Checkbox from 'react-three-state-checkbox';
import { render } from "react-dom";

// type imports
import Employee, { emptyEmployee } from "../../Types/Employee";

// api imports
import { getEmployees, getPositions, getAttendance, } from "../../ApiCalls/EmployeesApi";
import { getAdvance } from "../../ApiCalls/AdvanceApi";


// helper imports
import toasterConfig, { longToasterConfig } from "../../Helpers/ToasterConfig";

import "./Payroll.css"

import { Helmet } from "react-helmet";
import { AppName } from "../../Helpers/Util";
import { report } from "process";


function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
}

const Payroll: React.FC = () => {
  const { RangePicker } = DatePicker
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))

  const [positions, setPositions] = useState([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isEmployeesChanged, setIsEmployeesChanged] = useState(false)

  const [reportData, setReportData] = useState<PayrollDetailType[]>([])
  const [totalSalary, setTotalSalary] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState<any>([]);
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);

  const [isExportClicked, setIsExportClicked] = useState(false)
  const [isGenerateClicked, setIsGenerateClicked] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const forceUpdate = useForceUpdate();
  const [isSelectedEmployeesMixed, setIsSelectedEmployeesMixed] = useState(false)
  const [isGenerateStrict, setIsGenerateStrict] = useState(true)
  const [payrollData, setPayrollData] = useState([])

  useEffect(() => {
    getEmployees()
      .then((response) => {
        // console.log(response.data.data.employees)
        setEmployees(response.data.data.employees)
        setIsEmployeesChanged(false)
      })
    // setEmployees([tempEmployee])
  }, [isEmployeesChanged])

  useEffect(() => {
    getPositions()
      .then((response) => {
        // console.log(response.data.data.positions)
        setPositions(response.data.data.positions)
      })
  }, [])


  const handleEmployeeSelection = (selectedOptions: any) => {
    setSelectedEmployees(selectedOptions);
  }


  const handlePayoutSelection = (selectedOption: any) => {
    let tempEmployees:any = []

    employees.forEach((e:Employee)=>{
        if(e.payout === selectedOption.value){
            const employeeObj = {value: e.id, label: e.first_name + " " + (e.middle_name === ""? "":e.middle_name+" ") + e.last_name}
            tempEmployees.push(employeeObj)
        }
    })
    setSelectedEmployees(tempEmployees)
    setSelectedPayouts(selectedOption.value)

    if (selectedOption.value === "monthly"){
        setStartDate(dayjs().startOf("month"))
        setEndDate(dayjs())
    } else if (selectedOption.value === "weekly"){
        setStartDate(dayjs().startOf("week"))
        setEndDate(dayjs())
    }

    forceUpdate()
    
  };

  const handleDateChange = (range: any) => {
    setStartDate(range[0])
    setEndDate(range[1])
  }

  const isPayoutSame = (data:any) => {
        const currPayout = data[0].payout
        data.forEach((e:Employee)=>{
            if(e.payout !== currPayout)
                return false
        
        })
            
        return true
    }

  const handleGenerateReport = async () => {
    toast.loading("Generating payroll...")
    setIsGenerateClicked(true)

    if (selectedEmployees.length === 0)
      return

    let selectedEmployeesId = selectedEmployees.map(({value}:any)=>value)
    let selectedEmployeesData = employees.filter((employee) => selectedEmployeesId.includes(employee.id));
    
    const payoutSame = isPayoutSame(selectedEmployeesData)

    if (!payoutSame){
        toast.error("Selected employees have different payout schedule. \nPlease select employees with similar schedule.", longToasterConfig)
        setIsGenerateClicked(false)
        return
    } 

    if(isGenerateStrict){
    
        const payout = selectedEmployeesData[0].payout
        if(payout === "monthly" && !dayjs().isSame(dayjs().endOf("month"))){
            toast.dismiss()
            toast.error("Selected employees have monthly payouts. \nYou can only generate payroll at the end of the month.", longToasterConfig)
            setIsGenerateClicked(false)
            return
        }
        if(payout === "weekly" && !dayjs().isSame(dayjs().endOf("week"))){
            toast.dismiss()
            toast.error("Selected employees have monthly payouts. \nYou can only generate payroll at the end of the month.", longToasterConfig)
            setIsGenerateClicked(false)
            return
        }
    }



    // console.log(selectedEmployeesData)
    let payroll:any = []

    for (let i=0; i<selectedEmployeesData.length; i++){
        let employee = selectedEmployeesData[i]
        const response1 = await getPayroll("", employee.id, "", startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
        try{
            payroll.push(response1.data.data.salaries[0])
        } catch {
            const response2 = await createPayroll(employee.id, employee.payout, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
            try{
                const response3 = await getPayroll("", employee.id, "", startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
                payroll.push(response3.data.data.salaries[0])
            } catch {

            }
        }
    }

    toast.dismiss()
    toast.success("Payroll generated")
    setIsGenerateClicked(false)
    setHasGenerated(true)
    setReportData(payroll);
    setTotalSalary(payroll.reduce((total:number, item:any) => total + Number(item.net_salary), 0));
    
    // await Promise.all(selectedEmployeesData.map(async ({id, payout, position_id}:Employee) => {
        
    //     getPayroll("", id, "", startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
    //         .then((getResponse)=>{
    //             console.log(getResponse)
    //             if(getResponse.data.status === "201"){
    //                 payroll.push(getResponse.data.data.salaries[0])
    //             } else {
    //                 createPayroll(id, payout, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
    //                     .then((createResponse)=>{
    //                         if(createResponse.data.status==="201"){
    //                             getPayroll("", id, "", startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
    //                                 .then((getResponse2)=>{
    //                                     payroll.push(getResponse2.data.data.salaries[0])
    //                                 })
    //                         }
            
    //                     })
    //             }

    //         })  

    // }))
    // .then(()=>{
    //     console.log(payroll)
    //     setIsGenerateClicked(false)
    //     setHasGenerated(true)
    //     setReportData(payroll);
    //     setTotalSalary(payroll.reduce((total:number, item:any) => total + Number(item.net_salary), 0));
    // })

  };



  const columns: any = [
    {
      title: "Name",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "# of Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (value: number) => moneyFormatter.format(value)
    },
    {
      title: "Gross Salary",
      dataIndex: "gross_salary",
      key: "gross_salary",
      render: (value: number) => moneyFormatter.format(value)
    },
    {
      title: "Advance",
      dataIndex: "advances",
      key: "advances",
      render: (value: number) => moneyFormatter.format(value)
    },
    {
      title: "SSS",
      dataIndex: "sss",
      key: "sss",
      render: (value: number) => moneyFormatter.format(value)
    },
    {
      title: "Net Salary",
      dataIndex: "net_salary",
      key: "net_salary",
      render: (value: number) => moneyFormatter.format(value)
    },
  ];

  const handleExport = async () => {
    setIsExportClicked(true)

    toast.loading("Generating PDF", toasterConfig)

    if (reportData.length === 0) {
      toast.dismiss()
      toast.error("Error generating PDF", toasterConfig)
      setIsExportClicked(false)
    }
    else {
      // console.log(reportData)
      Payroll2PDF(reportData, startDate, endDate);
      toast.dismiss()
      toast.success("PDF successfully generated", toasterConfig)
      setIsExportClicked(false)
    }
  }

  const payout_options = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'weekly', label: 'Weekly' },
  ]

  const CheckboxOption = (props: OptionProps<any>) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.selectOption(props.data)
    }

    return (
      <div className="payroll-dropdown-options">
        <input type={"checkbox"} checked={props.isSelected} onChange={handleChange} />
        <components.Option {...props} />
      </div>
    )
  };

  // console.log(reportData)
  return (
    <div className="payroll-container">
      <Helmet>
        <title>Payroll - {AppName}</title>
      </Helmet>

      <div className="payroll-content-wrapper">
        <Sidebar />

        <div className="payroll-inner-container">

          <div className="payroll-header">
            <h1>PAYROLL</h1>

            <div className="payroll-date-range-container">
              <div className="payroll-date-range-label">
                <p>Date range</p>
              </div>

              <RangePicker
                className="advance-rangepicker"
                size={"small"}
                value={[startDate, endDate]}
                style={{ width: '13vw' }}
                format={"MMM DD YYYY"}
                separator={"to"}
                bordered={false}
                onCalendarChange={e => handleDateChange(e)}
              />
            </div>

            <div className="payroll-btns-container">
                <div className="payroll-generate-button-container">
                    <input type="checkbox" checked={isGenerateStrict} onClick={()=>setIsGenerateStrict(prev=>!prev)}/>
                    <text>Is strict?  </text>
                </div>
                <div className="payroll-generate-button-container">
                    <Button
                    type={"generate-payroll"}
                    handleClick={handleGenerateReport}
                    />
                </div>

                <div className="payroll-export-container">
                <Button
                    type="expense-export"
                    handleClick={() => handleExport()}
                    disabled={!hasGenerated || isExportClicked}
                />
                </div>
            </div>
          </div>

          <div className="payroll-employee-detail-menus">
            
            <div className="payroll-menus-container">
                <div className="payroll-menus-section payout">
                    <h3 className="payroll-menu-label payout">PAYOUT</h3>
                    <Select
                        className="payroll-menu-dropdown payout"
                        closeMenuOnSelect={true}
                        options={payout_options}
                        onChange={handlePayoutSelection}
                        isSearchable={false}
                    />
                </div>
                <div className="payroll-menus-section employees">
                    <h3 className="payroll-menu-label">EMPLOYEES</h3>
                    <Select
                        className="payroll-menu-dropdown employees"
                        value={selectedEmployees}
                        defaultValue={selectedEmployees}
                        closeMenuOnSelect={false}
                        isMulti
                        components={{ Option: CheckboxOption }}
                        options={employees.map(({ id, first_name, middle_name, last_name }:any) => ({ value: id, label: first_name + " " + (middle_name === ""? "":middle_name+" ") + last_name }))}
                        onChange={handleEmployeeSelection}
                        controlShouldRenderValue={true}
                    />
                </div>
                
            </div>
          </div>

          <div className="payroll-details-table">
            <Table
              columns={columns}
              dataSource={reportData}
              pagination={false}
              scroll={{ y:"55vh"}}
            />
          </div>

          <div className="payroll-total-net-salary">
            <p>Total: {' '}
              <span>{moneyFormatter.format(totalSalary)}</span> </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payroll;
