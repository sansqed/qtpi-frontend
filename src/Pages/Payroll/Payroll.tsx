// local imports
import Button from "../../Components/Button/Button";
import Sidebar from "../../Components/Sidebar/Sidebar";

// helper imports
import { formatMoney } from "../../Helpers/Util";

// external imports
import { DatePicker, Table } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useEffect } from "react";
import Select, { components, OptionProps } from 'react-select';

// type imports
import Employee, { emptyEmployee } from "../../Types/Employee";

// api imports
import { getEmployees, getPositions, getAttendance, } from "../../ApiCalls/EmployeesApi";
import { getAdvance } from "../../ApiCalls/AdvanceApi";

import "./Payroll.css"



interface PayrollTableData {
  name: string;
  position: string;
  num_days: number;
  rate: string;
  gross_salary: number;
  cash_advance: number;
  employee_sss: string;
  net_salary: number;
};

const Payroll: React.FC = () => {
  const { RangePicker } = DatePicker
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))

  const [positions, setPositions] = useState([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isEmployeesChanged, setIsEmployeesChanged] = useState(false)


  const [reportData, setReportData] = useState<any[]>([])
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);


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


  const handleEmployeeSelection = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    setSelectedEmployees(selectedIds);
  }

  const handlePositionSelection = (selectedOptions: any) => {
    const selectedPositionIds = selectedOptions.map((option: any) => option.value);
    setSelectedPositions(selectedPositionIds);
  };

  const handlePayoutSelection = (selectedOptions: any) => {
    const selectedPayoutsModes = selectedOptions.map((option: any) => option.value);
    setSelectedPayouts(selectedPayoutsModes)
  };

  const handleDateChange = (range: any) => {
    setStartDate(range[0])
    setEndDate(range[1])
  }

  const handleGenerateReport = async () => {
    const selectedEmployeesData = employees.filter((employee) => selectedEmployees.includes(employee.id));
    let filteredEmployeesData = selectedEmployeesData;

    if (selectedPositions.length > 0) {
      filteredEmployeesData = filteredEmployeesData.filter((employee) =>
        selectedPositions.includes(employee.position_id)
      );
    }

    if (selectedPayouts.length > 0) {
      filteredEmployeesData = filteredEmployeesData.filter((employee) =>
        selectedPayouts.includes(employee.payout)
      );
    }

    const generatedReport = await Promise.all(filteredEmployeesData.map(async (employee) => {
      let totalAttendance = 0;
      let totalAdvance = 0;

      const attendanceData = await getAttendance(employee.id, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
        .then((response) => {
          console.log(response.data.data.attendance)

          response.data.data.attendance.map((a: any) => {
            console.log(a.status)
            if (a.status == "present")
              totalAttendance += 1
            else if (a.status === "halfday")
              totalAttendance += 0.5
          });

        })
        .catch(() => {
          console.log("ERROR! :: getAttendance -> response !== 200 :: TotalAttendance set to 0")
        });

      const advanceData = await getAdvance(employee.id, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
        .then((response) => {
          console.log(response.data.data.advance)
          response.data.data.advance.map((a: any) => {
            totalAdvance += Number(a.amount)
          });
        })
        .catch(() => {
          console.log("ERROR! :: getAdvance -> response !== 200 :: totalAdvance set to 0")
        });

      const rate = parseInt(employee.rate);
      const grossSalary = totalAttendance * rate;
      const netSalary = grossSalary - totalAdvance - parseInt(employee.SSS ?? "0");

      return {
        full_name: `${employee.first_name} ${employee.middle_name} ${employee.last_name}`,
        position: employee.position_name,
        num_days: totalAttendance,
        rate: employee.rate,
        gross_salary: grossSalary,
        cash_advance: totalAdvance,
        employee_sss: employee.SSS ?? "0",
        net_salary: netSalary
      };
    }));

    setReportData(generatedReport);
  };

  const columns: any = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position"
    },
    {
      title: "# of Days",
      dataIndex: "num_days",
      key: "num_days"
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate"
    },
    {
      title: "Gross Salary",
      dataIndex: "gross_salary",
      key: "gross_salary"
    },
    {
      title: "CA",
      dataIndex: "cash_advance",
      key: "cash_advance"
    },
    {
      title: "SSS",
      dataIndex: "employee_sss",
      key: "employee_sss"
    },
    {
      title: "Net Salary",
      dataIndex: "net_salary",
      key: "net_salary"
    }
  ];


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

  console.log(selectedPayouts)
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
                options={employees.map(({ id, first_name, middle_name, last_name }) => ({ value: id, label: first_name + " " + middle_name + " " + last_name }))}
                onChange={handleEmployeeSelection}
              />

              <Select
                className="payroll-menu-positions-dropdown"
                closeMenuOnSelect={false}
                isMulti
                components={{ Option: CheckboxOption }}
                options={positions.map(({ id, name }) => ({ value: id, label: name }))}
                onChange={handlePositionSelection}
              />

              <Select
                className="payroll-menu-payouts-dropdown"
                closeMenuOnSelect={false}
                isMulti
                components={{ Option: CheckboxOption }}
                options={payout_options}
                onChange={handlePayoutSelection}
              />
            </div>

          </div>

          <div className="payroll-separator-bar" />

          <div className="payroll-generate-button-container">
            <Button
              type={"generate-payroll"}
              handleClick={handleGenerateReport}
            />
          </div>

          <div className="payroll-details-table">
            <Table
              columns={columns}
              dataSource={reportData}
            />
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
