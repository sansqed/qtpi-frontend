import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import type ExpenseType from "../../Types/Expense";
import dayjs from "dayjs";
import ExpenseDetailType from "../../Types/ExpenseDetail";
import { moneyFormatter } from "../Util";

const Expenses2PDF = (data:Array<object>, expense: ExpenseType) => {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
    });

    const emptyCellStyle:any = {fillColor: "#ffffff"}
    
    // HEADER
    const headerStyle1:any = { halign: 'center', fontStyle: 'bold', fontSize: 18, fillColor: "#bdd6ee", textColor: "#000000" }
    const headerStyle2:any = { halign: 'center', fontStyle: 'bold', fontSize: 15, fillColor: "#bdd6ee", textColor: "#000000", }
    const headerStyle3:any = { halign: 'center', fontStyle: 'bold', fontSize: 13, fillColor: "#f4b083", textColor: "#000000", }
    const headerStyle4:any = { halign: 'right', valign: 'middle', fontStyle: 'bold', fontSize: 10, fillColor: "#bdd6ee", textColor: "#000000" }
    const headerStyle5:any = { halign: 'left', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000" }
    autoTable(doc, {
        head:[[{ content: "EMGG Poultry", colSpan: 2, rowSpan: 1, styles: headerStyle1 }]],
        body: [
            [{ content: "OPERATIONAL EXPENSES", colSpan: 2, rowSpan: 1, styles: headerStyle2 }],
            [{ content: "Grow " + expense.id, colSpan: 2, rowSpan: 1, styles: headerStyle3 }],
            [{ content: "COVERED PERIOD: ", colSpan: 1, rowSpan: 1, styles: headerStyle4 }, { content: dayjs(expense.date_from).format("MMM DD YYYY") + " - " + dayjs(expense.date_to).format("MMM DD YYYY"), colSpan: 1, rowSpan: 1, styles: headerStyle5 }]
        ]
    })
    
    const headerStyle6:any = { halign: 'left', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000", fillColor: "#ffd965" }
    const headerStyle7:any = { halign: 'center', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000", fillColor: "#d8d8d8", lineWidth: 0.002}

    const normalStyle:any = { halign: 'left', valign: 'middle', fontSize: 10, textColor: "#000000", cellPadding: 0.1 }
    const normalStyleMoney:any = { halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000", cellPadding: 0.1 }

    const totalStyle:any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000" }
    const totalStyleMoney:any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000" }
    
    let grandTotal = 0

    // CONTENTS
    data.forEach((d:any)=>{
        let total = 0
        let contents = d.expenses.map((e:ExpenseDetailType)=>{
            total += Number(e.amount)
            return([
                { content:  dayjs(e.expense_date_from).format("MMM DD YYYY") + (e.expense_date_to!==null? " - "+dayjs(e.expense_date_to).format("MMM DD YYYY"):""), colSpan: 1, rowSpan: 1, styles: normalStyle },
                { content:  e.qty, colSpan: 1, rowSpan: 1, styles: normalStyle },
                { content:  e.unit, colSpan: 1, rowSpan: 1, styles: normalStyle },
                { content:  e.expense_item_name, colSpan: 1, rowSpan: 1, styles: normalStyle },
                { content:  "Php " + moneyFormatter.format(Number(e.unit_price)).slice(1), colSpan: 1, rowSpan: 1, styles: normalStyleMoney },
                { content:  "Php " + moneyFormatter.format(Number(e.amount)).slice(1), colSpan: 1, rowSpan: 1, styles: normalStyleMoney },
            ])
        })
        contents.push([
            { content:  "", colSpan: 4, rowSpan: 1, styles: emptyCellStyle },
            { content:  "TOTAL", colSpan: 1, rowSpan: 1, styles: totalStyle }, 
            { content:  "Php " + moneyFormatter.format(total).slice(1), colSpan: 1, rowSpan: 1, styles: totalStyleMoney },
        ])

        grandTotal += total

        autoTable(doc,{
            head: [
                [{ content: d.classification_name.toUpperCase(), colSpan: 6, rowSpan: 1, styles: headerStyle6 }, 
                ],
                [
                    { content: "DATE", colSpan: 1, rowSpan: 1, styles: headerStyle7 },
                    { content: "QTY", colSpan: 1, rowSpan: 1, styles: headerStyle7 },
                    { content: "UNIT", colSpan: 1, rowSpan: 1, styles: headerStyle7 },
                    { content: "ITEM", colSpan: 1, rowSpan: 1, styles: headerStyle7 },
                    { content: "UNIT PRICE", colSpan: 1, rowSpan: 1, styles: headerStyle7 },
                    { content: "AMOUNT", colSpan: 1, rowSpan: 1, styles: headerStyle7 },
                ]
            ],

            body: contents
        })

    })
    
    // GRAND TOTAL
    const grandTotalStyle:any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000", fillColor: "#ffd965" }
    const grandTotalStyleMoney:any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000", fillColor: "#ffd965" }
    autoTable(doc,{
        head:[
            [
                { content:  "", colSpan: 4, rowSpan: 1, styles: {minCellWidth: 4.5, fillColor:"#ffffff"} },
                { content:  "GRAND TOTAL", colSpan: 1, rowSpan: 1, styles: grandTotalStyle}, 
                { content:  "Php " + moneyFormatter.format(grandTotal).slice(1), colSpan: 1, rowSpan: 1, styles: grandTotalStyleMoney },
            ]
        ]
    })

    doc.save("Grow " + expense.id + " Expenses.pdf")
}

export default Expenses2PDF