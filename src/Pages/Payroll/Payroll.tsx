// local imports
import Button from "../../Components/Button/Button";
import Sidebar from "../../Components/Sidebar/Sidebar";
import PayrollTable from "./PayrollTable";

// external imports
import { Form } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from 'antd';
import { useMemo } from 'react'


import "./Payroll.css" 

const Payroll: React.FC = () => {    

    return(

        <div className="payroll-container">

          <div className="payroll-content-wrapper"> 
            <Sidebar/>

            <div className="payroll-inner-container">

              <div className="payroll-header">
                <h1>PAYROLL</h1>
              </div>

              <div className="payroll-date-range">
                <p>Date range</p>

                <div className="payroll-init-date-container">
                  <Button
                    type="date-range"
                    handleClick={()=>{}}
                  />
                </div>
              
                <FontAwesomeIcon icon={["fas","arrows-left-right-to-line"]} className="date-range-arrow-icon"/>

                <div className="payroll-end-date-container">
                  <Button
                    type="date-range"
                    handleClick={()=>{}}
                  />
                </div>

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
                <PayrollTable/>
              </div>

            </div>

          </div>

        </div>
    )
}

export default Payroll;
