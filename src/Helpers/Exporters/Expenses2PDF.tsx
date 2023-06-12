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
    const headerStyle1:any = { halign: 'center', fontStyle: 'bold', fontSize: 18, fillColor: "#003459", textColor: "#ffffff" }
    const headerStyle2:any = { halign: 'center', fontStyle: 'bold', fontSize: 15, fillColor: "#ffffff", textColor: "#000000", }
    const headerStyle3:any = { halign: 'center', fontStyle: 'bold', fontSize: 13, fillColor: "#ffffff", textColor: "#000000", }
    const headerStyle4:any = { halign: 'right', valign: 'middle', fontStyle: 'bold', fontSize: 10, fillColor: "#ffffff", textColor: "#000000", minCellWidth: 1.9 }
    const headerStyle5:any = { halign: 'left', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000", fillColor: "#ffffff" }
    
    autoTable(doc, {
        head:[[{ content: "EMGG Poultry", colSpan: 2, rowSpan: 1, styles: headerStyle1 }]],
        body: [
            [{ content: "OPERATIONAL EXPENSES", colSpan: 2, rowSpan: 1, styles: headerStyle2 }],
            [{ content: "Grow " + expense.id, colSpan: 2, rowSpan: 1, styles: headerStyle3 }],
            [{ content: "COVERED PERIOD: ", colSpan: 1, rowSpan: 1, styles: headerStyle4 }, { content: dayjs(expense.date_from).format("MMM DD YYYY") + " - " + dayjs(expense.date_to).format("MMM DD YYYY"), colSpan: 1, rowSpan: 1, styles: headerStyle5 }]
        ]
    })
    
    const headerStyle6:any = { halign: 'left', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000", fillColor: "#FFE8A8" }
    const headerStyle7:any = { halign: 'center', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000", fillColor: "#E8E8E8", cellPadding: 0.1}

    // customize width of every column
    const dateWidthLong = {cellWidth: 1.9}
    const dateWidthShort = {cellWidth: 1}
    const qtyWidth = {cellWidth: 0.5}
    const unitWidth = {cellWidth: 0.7}
    const itemWidthShort = {cellWidth: 1.9}
    const itemWidthLong = {cellWidth: 2.8}
    const unitPriceWidth = {cellWidth: 1.2}
    const amountWidth = {cellWidth: 1.2}

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
                { content:  dayjs(e.expense_date_from).format("MMM DD YYYY") + (e.expense_date_to!==null? " - "+dayjs(e.expense_date_to).format("MMM DD YYYY"):""), colSpan: 1, rowSpan: 1, styles: d.classification_name==="Labor"? {...normalStyle, ...dateWidthLong}:{...normalStyle, ...dateWidthShort} },
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
            theme:"grid",
            styles: {lineWidth: 0.0005, lineColor: "#5C5C5C"},
            head: [
                [{ content: d.classification_name.toUpperCase(), colSpan: 6, rowSpan: 1, styles: headerStyle6 }, 
                ],
                [
                    { content: "DATE", colSpan: 1, rowSpan: 1, styles:  d.classification_name==="Labor"? {...headerStyle7, ...dateWidthLong}:{...headerStyle7, ...dateWidthShort}},
                    { content: "QTY", colSpan: 1, rowSpan: 1, styles: {...headerStyle7, ...qtyWidth} },
                    { content: "UNIT", colSpan: 1, rowSpan: 1, styles: {...headerStyle7, ...unitWidth} },
                    { content: "ITEM", colSpan: 1, rowSpan: 1, styles: d.classification_name==="Labor"? {...headerStyle7, ...itemWidthShort}:{...headerStyle7, ...itemWidthLong} },
                    { content: "UNIT PRICE", colSpan: 1, rowSpan: 1, styles: {...headerStyle7, ...unitPriceWidth} },
                    { content: "AMOUNT", colSpan: 1, rowSpan: 1, styles: {...headerStyle7, ...amountWidth} },
                ]
            ],

            body: contents
        })

    })
    
    // GRAND TOTAL
    const grandTotalStyle:any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000", fillColor: "#ffd965" }
    const grandTotalStyleMoney:any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000", fillColor: "#ffd965", cellWidth: 1.5 }
    autoTable(doc,{
        theme:"grid",
        styles: {lineWidth: 0.0005, lineColor: "#000000"},
        head:[
            [
                { content:  "GRAND TOTAL  ", colSpan: 5, rowSpan: 1, styles: grandTotalStyle}, 
                { content:  "Php " + moneyFormatter.format(grandTotal).slice(1), colSpan: 1, rowSpan: 1, styles: grandTotalStyleMoney },
            ]
        ]
    })

    doc.save("Grow " + expense.id + " Expenses.pdf")
}

export default Expenses2PDF