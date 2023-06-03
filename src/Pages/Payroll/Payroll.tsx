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

import "./Payroll.css"

const Payroll: React.FC = () => {
  const { RangePicker } = DatePicker
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))

  const handleDateChange = (range: any) => {
    setStartDate(range[0])
    setEndDate(range[1])
  }

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

            <Form>

              <Row>

                <Form.Group>

                  <div className="payroll-menu-labels">
                    <h1 className="payroll-menu-label-employees">EMPLOYEES</h1>
                    <h1 className="payroll-menu-label-position">POSITION</h1>
                    <h1 className="payroll-menu-label-sss">SSS</h1>
                  </div>

                  <Form.Select
                    className="payroll-dropdown-menu"
                    id="employee"
                    name="employee"
                  // onChange{(e) => handleChange(e)}
                  >
                    <option value={"EMPTY"}></option>
                    <option value={"TEMP"}>TEMP</option>
                  </Form.Select>

                  <Form.Select
                    className="payroll-dropdown-menu"
                    id="position"
                    name="position"
                  // onChange{(e) => handleChange(e)}
                  >
                    <option value={"EMPTY"}></option>
                    <option value={"TEMP"}>TEMP</option>
                  </Form.Select>

                  <Form.Select
                    className="payroll-dropdown-menu"
                    id="sss"
                    name="sss"
                  // onChange{(e) => handleChange(e)}
                  >
                    <option value={"EMPTY"}></option>
                    <option value={"TEMP"}>TEMP</option>
                  </Form.Select>

                </Form.Group>
              </Row>
            </Form>

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
