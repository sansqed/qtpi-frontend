// local imports
import Button from "../../Components/Button/Button";
import Sidebar from "../../Components/Sidebar/Sidebar";
import PayrollTable from "./PayrollTable";

// external imports
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useEffect } from "react";
import Select, { components, OptionProps } from 'react-select';

// type imports
import Employee, { emptyEmployee } from "../../Types/Employee";

// api imports
import { getEmployees, getPositions } from "../../ApiCalls/EmployeesApi";

import "./Payroll.css"

const Payroll: React.FC = () => {
  const { RangePicker } = DatePicker
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))

  const [positions, setPositions] = useState([])
  const [employees, setEmployees] = useState<[Employee]>()
  const [isEmployeesChanged, setIsEmployeesChanged] = useState(false)


  const handleDateChange = (range: any) => {
    setStartDate(range[0])
    setEndDate(range[1])
  }

  useEffect(() => {
    getEmployees()
      .then((response) => {
        console.log(response)
        console.log(response.data.data.employees)
        setEmployees(response.data.data.employees)
        setIsEmployeesChanged(false)
      })
    // setEmployees([tempEmployee])
  }, [isEmployeesChanged])

  useEffect(() => {
    getPositions()
      .then((response) => {
        console.log(response.data.data.positions)
        setPositions(response.data.data.positions)
      })
  }, [])

  const employee_options = [
    { value: 'employee1', label: 'Employee 1' },
    { value: 'employee2', label: 'Employee 2' },
    { value: 'employee3', label: 'Employee 3' }
  ]

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

  return (

    <div className="payroll-container">

      <div className="payroll-content-wrapper">
        <Sidebar />

        <div className="payroll-inner-container">

          <div className="payroll-header">
            <h1>PAYROLL</h1>
          </div>

          <div className="payroll-date-range-container">
            <div className="payroll-date-range-label">
              <p>Date range</p>
            </div>

            <RangePicker
              className="advance-rangepicker"
              size={"small"}
              defaultValue={[startDate, endDate]}
              style={{ width: '65%' }}
              format={"MMM DD YYYY"}
              separator={"to"}
              bordered={false}
              onCalendarChange={e => handleDateChange(e)}
            />
          </div>

          <div className="payroll-employee-detail-menus">

            <div className="payroll-menu-labels">
              <h1 className="payroll-menu-label-employees">EMPLOYEES</h1>
              <h1 className="payroll-menu-label-position">POSITION</h1>
              <h1 className="payroll-menu-label-sss">PAYOUT</h1>
            </div>

            <div className="payroll-menus-container">

              <Select
                className="payroll-menu-employees-dropdown"
                closeMenuOnSelect={false}
                isMulti
                components={{ Option: CheckboxOption }}
                options={employee_options} />

              <Select
                className="payroll-menu-positions-dropdown"
                closeMenuOnSelect={false}
                isMulti
                components={{ Option: CheckboxOption }}
                options={positions.map(({ id, name }) => ({ value: id, label: name }))} />

              <Select
                className="payroll-menu-payouts-dropdown"
                closeMenuOnSelect={false}
                isMulti
                components={{ Option: CheckboxOption }}
                options={payout_options} />
            </div>

          </div>

          <div className="payroll-separator-bar" />

          <div className="payroll-generate-button-container">
            <Button
              type={"generate-payroll"}
              handleClick={() => { }}
            />
          </div>

          <div className="payroll-details-table">
            <PayrollTable />
          </div>

          <div className="payroll-export-container">
            <Button
              type={"export-pdf"}
              handleClick={() => { }}
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Payroll;
