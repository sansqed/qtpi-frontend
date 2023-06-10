import React, {Component} from 'react';
// SpreadJS imports
import '@grapecity/spread-sheets-react';
/* eslint-disable */
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import { SpreadSheets, Worksheet, Column } from '@grapecity/spread-sheets-react';

export const SalesTable = ({ tableData }:any ) => {
    const config = {
        sheetName: 'Sales Data',
        hostClass: ' spreadsheet',
        autoGenerateColumns: false,
        width: 200,
        visible: true,
        resizable: true,
        priceFormatter: '$ #.00',
        chartKey: 1
    }
}

const ExpenseExportExcel = async() => {
    return(
        <></>
    )
}

export default ExpenseExportExcel;







