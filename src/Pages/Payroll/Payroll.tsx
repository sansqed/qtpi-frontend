// local imports
import Button from "../../Components/Button/Button";
import Sidebar from "../../Components/Sidebar/Sidebar";
import PayrollTable from "./PayrollTable";
// import { mock_data, headers } from './temp-data.json'

// external imports
import { Form } from "react-bootstrap"
import { DatePicker, Table, Input, InputNumber, Popconfirm, Typography } from 'antd';
import Row from "react-bootstrap/Row"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useEffect } from "react";
import Select from 'react-select';

import "./Payroll.css"

const Payroll: React.FC = () => {
  const { RangePicker } = DatePicker
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))

  const handleDateChange = (range: any) => {
    setStartDate(range[0])
    setEndDate(range[1])
  }

  const employee_options = [
    { value: 'employee1', label: 'Employee 1' },
    { value: 'employee2', label: 'Employee 2' },
    { value: 'employee3', label: 'Employee 3' }
  ]

  const position_options = [
    { value: 'pos1', label: 'Position 1' },
    { value: 'pos2', label: 'Position 2' },
    { value: 'pos3', label: 'Position 3' }
  ]

  const payout_options = [
    { value: 'pay1', label: 'Payout 1' },
    { value: 'pay2', label: 'Payout 2' },
    { value: 'pay3', label: 'Payout 3' }
  ]


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
                isMulti
                options={employee_options} />

              <Select
                className="payroll-menu-positions-dropdown"
                isMulti
                options={position_options} />

              <Select
                className="payroll-menu-payouts-dropdown"
                isMulti
                options={payout_options} />
            </div>

            {/* <Form.Select */}
            {/*   className="payroll-dropdown-menu" */}
            {/*   id="employee" */}
            {/*   name="employee" */}
            {/*   multiple */}
            {/* // onChange{(e) => handleChange(e)} */}
            {/* > */}
            {/*   <option value={"Employee 1"}>Employee 1</option> */}
            {/*   <option value={"Employee 2"}>Employee 2</option> */}
            {/*   <option value={"Employee 3"}>Employee 3</option> */}
            {/* </Form.Select> */}
            {/**/}
            {/* <Form.Select */}
            {/*   className="payroll-dropdown-menu" */}
            {/*   id="position" */}
            {/*   name="position" */}
            {/*   multiple */}
            {/* // onChange{(e) => handleChange(e)} */}
            {/* > */}
            {/*   <option value={"TEMP"}>TEMP</option> */}
            {/* </Form.Select> */}
            {/**/}
            {/* <Form.Select */}
            {/*   className="payroll-dropdown-menu" */}
            {/*   id="sss" */}
            {/*   name="sss" */}
            {/*   multiple */}
            {/* // onChange{(e) => handleChange(e)} */}
            {/* > */}
            {/*   <option value={"TEMP"}>TEMP</option> */}
            {/* </Form.Select> */}

          </div>


          <div className="payroll-details-table">
            <PayrollTable />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Payroll;
