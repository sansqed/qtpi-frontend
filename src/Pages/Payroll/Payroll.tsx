// local imports
import Button from "../../Components/Button/Button";
import Sidebar from "../../Components/Sidebar/Sidebar";

// external imports
import { Form } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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

                    </Form.Group>


                  </Row>

                </Form>

              </div>

            </div>

          </div>

        </div>
    )
}

export default Payroll;
