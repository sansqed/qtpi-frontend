// local imports
import Button from "../../Components/Button/Button";
import Sidebar from "../../Components/Sidebar/Sidebar";
import PayrollDetailType from "../../Types/PayrollDetail";
import Payroll2PDF from "../../Helpers/Exporters/Payroll2PDF";

// helper imports
import { moneyFormatter } from "../../Helpers/Util";

// external imports
import { DatePicker, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useEffect } from "react";
import Select, { components, OptionProps } from 'react-select';
import { toast } from "react-hot-toast";
import makeAnimated from 'react-select/animated';

// type imports
import Employee, { emptyEmployee } from "../../Types/Employee";

// api imports
import { getEmployees, getPositions, getAttendance, } from "../../ApiCalls/EmployeesApi";
import { getAdvance } from "../../ApiCalls/AdvanceApi";


// helper imports
import toasterConfig from "../../Helpers/ToasterConfig";

import "./Payroll.css"

import { Helmet } from "react-helmet";
import { AppName } from "../../Helpers/Util";
import { report } from "process";

const Payroll: React.FC = () => {
  const { RangePicker } = DatePicker
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"))

  const [positions, setPositions] = useState([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isEmployeesChanged, setIsEmployeesChanged] = useState(false)

  const [reportData, setReportData] = useState<PayrollDetailType[]>([])
  const [totalSalary, setTotalSalary] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);

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
    toast.loading("Generating Report", toasterConfig)

    let selectedEmployeesData;
    if (selectedEmployees.length === 0) {
      selectedEmployeesData = employees
    } else {
      selectedEmployeesData = employees.filter((employee) => selectedEmployees.includes(employee.id));
    }

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
          // console.log(response.data.data.attendance)

          response.data.data.attendance.map((a: any) => {
            // console.log(a.status)
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
          // console.log(response)
          // console.log(response.data.data.advance)
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
    toast.dismiss()
    toast.success("Report successfully generated", toasterConfig)
    setReportData(generatedReport);
    setTotalSalary(generatedReport.reduce((total, item) => total + item.net_salary, 0));
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
      key: "position",
    },
    {
      title: "# of Days",
      dataIndex: "num_days",
      key: "num_days",
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
      title: "CA",
      dataIndex: "cash_advance",
      key: "cash_advance",
      render: (value: number) => moneyFormatter.format(value)
    },
    {
      title: "SSS",
      dataIndex: "employee_sss",
      key: "employee_sss",
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
    toast.loading("Generating PDF", toasterConfig)

    if (reportData.length === 0) {
      toast.dismiss()
      toast.error("Error generating PDF", toasterConfig)
    }
    else {
      // console.log(reportData)
      Payroll2PDF(reportData, startDate, endDate);
      toast.dismiss()
      toast.success("PDF successfully generated", toasterConfig)
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

          <div className="payroll-total-net-salary">
            <p>Total: {' '}
              <span>{moneyFormatter.format(totalSalary)}</span> </p>
          </div>

          <div className="payroll-export-container">
            <Button
              type="expense-export"
              handleClick={() => handleExport()}
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Payroll;
