import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import * as temp_data from './temp-data.json';
import * as temp_headers from './temp-columns.json';

import './PayrollTable.css'

interface PayrollTableData {
  name: string;
  position: string;
  num_days: number;
  num_overtime: number;
  rate: number;
  overtime: number;
  gross_salary: number;
  cash_advance: number;
  employee_sss: number;
  net_salary: number;
};

const columns: ColumnsType<PayrollTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
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
    title: "# of O.T",
    dataIndex: "num_overtime",
    key: "num_overtime"
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate"
  },
  {
    title: "O.T",
    dataIndex: "overtime",
    key: "overtime"
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

const data: PayrollTableData[] = [
  {
    "name": "Conrado Avila",
    "position": "Regular",
    "num_days": 7,
    "num_overtime": 0,
    "rate": 450.00,
    "overtime": 0.00,
    "gross_salary": 3150.00,
    "cash_advance": 0.00,
    "employee_sss": 228.00,
    "net_salary": 2862.00
  },
  {
    "name": "Sigmund Freud",
    "position": "Seasonal",
    "num_days": 5,
    "num_overtime": 0,
    "rate": 450.00,
    "overtime": 0.00,
    "gross_salary": 2000.00,
    "cash_advance": 200.00,
    "employee_sss": 0.00,
    "net_salary": 1800.00
  },
  {
    "name": "Andrew Tate",
    "position": "Influencer",
    "num_days": 6.5,
    "num_overtime": 0,
    "rate": 700.00,
    "overtime": 0.00,
    "gross_salary": 4550.00,
    "cash_advance": 500.00,
    "employee_sss": 228.00,
    "net_salary": 3822.00
  }
];



const PayrollTable: React.FC = () => {
  // 
  // interface TData {
  //   name: string;
  //   position: string;
  //   num_days: number;
  //   num_overtime: number;
  //   rate: number;
  //   overtime: number;
  //   gross_salary: number;
  //   cash_advance: number;
  //   employee_sss: number;
  //   net_salary: number;
  // };
  //


  // const td_arr = temp_data;
  // const th_arr = temp_headers;

  const grossSalarySum = data.reduce((total, item) => total + item.gross_salary, 0);
  const netSalarySum = data.reduce((total, item) => total + item.net_salary, 0);

  return (
    <div className="payroll-table-container">
      <div className="payroll-test-table">
        <Table<PayrollTableData> columns={columns} dataSource={data} />
      </div>
      <div className="payroll-separator-bar" />
      <div className="payroll-additional-details">
        <h1 className="payroll-additional-details-gross">TOTAL GROSS</h1>
        <h1 className="payroll-additional-details-gross-val">{grossSalarySum}</h1>
        <h1 className="payroll-additional-details-net">TOTAL NET</h1>
        <h1 className="payroll-additional-details-net-val">{netSalarySum}</h1>
      </div>
    </div>
  );
};

export default PayrollTable;
