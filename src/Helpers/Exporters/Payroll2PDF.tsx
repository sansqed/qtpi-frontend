import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { moneyFormatter } from "../Util";
import { Dayjs } from "dayjs";

const Payroll2PDF = (data: Array<object>, start_date: Dayjs, end_date: Dayjs) => {

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: "letter"
  });

  const emptyCellStyle: any = { fillColor: "#ffffff" }

  // HEADER
  const headerStyle1: any = { halign: 'center', fontStyle: 'bold', fontSize: 18, fillColor: "#003459", textColor: "#ffffff" }
  const headerStyle2: any = { halign: 'center', fontStyle: 'bold', fontSize: 15, fillColor: "#ffffff", textColor: "#000000", }
  const headerStyle3: any = { halign: 'center', fontStyle: 'bold', fontSize: 13, fillColor: "#ffffff", textColor: "#000000", }
  const headerStyle4: any = { halign: 'right', valign: 'middle', fontStyle: 'bold', fontSize: 10, fillColor: "#ffffff", textColor: "#000000", minCellWidth: 1.9 }
  const headerStyle5: any = { halign: 'left', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000", fillColor: "#ffffff" }

  autoTable(doc, {
    head: [[{ content: "EMGG Poultry", colSpan: 2, rowSpan: 1, styles: headerStyle1 }]],
    body: [
      [{ content: "PAYROLL", colSpan: 2, rowSpan: 1, styles: headerStyle2 }],
      [{ content: "COVERED PERIOD: ", colSpan: 1, rowSpan: 1, styles: headerStyle4 }, { content: start_date.format("MMM DD YYYY") + " - " + end_date.format("MMM DD YYYY"), colSpan: 1, rowSpan: 1, styles: headerStyle5 }]
    ]
  })

  const headerStyle6: any = { halign: 'left', valign: 'middle', fontStyle: 'bold', fontSize: 10, textColor: "#000000", fillColor: "#FFE8A8" }
  const headerStyle7: any = { halign: 'center', valign: 'middle', fontStyle: 'bold', fontSize: 8, textColor: "#000000", fillColor: "#E8E8E8", cellPadding: 0.1 }

  // customize width of every column
  const dateWidthLong = { cellWidth: 1.8 }
  const dateWidthShort = { cellWidth: 1 }
  const qtyWidth = { cellWidth: 0.5 }
  const numWidth = { cellWidth: 0.8 }
  const unitWidth = { cellWidth: 0.7 }
  const positionWidth = { cellWidth: 0.9 }
  const amountWidth = { cellWidth: 1.3 }
  const netWidth = { cellWidth: 1.4 }

  const normalStyle: any = { halign: 'left', valign: 'middle', fontSize: 9, textColor: "#000000", cellPadding: 0.1 }
  const normalStyleMoney: any = { halign: 'right', valign: 'middle', fontSize: 9, textColor: "#000000", cellPadding: 0.1 }

  const totalStyle: any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000" }
  const totalStyleMoney: any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000" }

  let totalSalary = 0

  // CONTENTS
  console.log(data)
  const contents = data.map((d: any) => {
    let total = Number(d.net_salary);
    totalSalary += total;

    return [
      { content: d.full_name, colSpan: 1, rowSpan: 1, styles: normalStyle },
      { content: d.position, colSpan: 1, rowSpan: 1, styles: normalStyle },
      { content: d.num_days, colSpan: 1, rowSpan: 1, styles: normalStyle },
      { content: "Php " + moneyFormatter.format(Number(d.rate)).slice(1), colSpan: 1, rowSpan: 1, styles: normalStyleMoney },
      { content: "Php " + moneyFormatter.format(Number(d.gross_salary)).slice(1), colSpan: 1, rowSpan: 1, styles: normalStyleMoney },
      { content: "Php " + moneyFormatter.format(Number(d.cash_advance)).slice(1), colSpan: 1, rowSpan: 1, styles: normalStyleMoney },
      { content: "Php " + moneyFormatter.format(Number(d.employee_sss)).slice(1), colSpan: 1, rowSpan: 1, styles: normalStyleMoney },
      { content: "Php " + moneyFormatter.format(Number(d.net_salary)).slice(1), colSpan: 1, rowSpan: 1, styles: normalStyleMoney },
      { content: "", colSpan: 4, rowSpan: 1, styles: emptyCellStyle },
      { content: "TOTAL", colSpan: 1, rowSpan: 1, styles: totalStyle },
      { content: "Php " + moneyFormatter.format(total).slice(1), colSpan: 1, rowSpan: 1, styles: totalStyleMoney },
    ];
  });

  autoTable(doc, {
    theme: "grid",
    styles: { lineWidth: 0.0005, lineColor: "#5C5C5C" },
    head: [
      [
        { content: "FULL NAME", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...dateWidthLong } },
        { content: "POSITION", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...positionWidth } },
        { content: "# DAYS", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...qtyWidth } },
        { content: "RATE", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...amountWidth } },
        { content: "GROSS SALARY", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...netWidth } },
        { content: "ADVANCE", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...amountWidth } },
        { content: "SSS", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...amountWidth } },
        { content: "NET SALARY", colSpan: 1, rowSpan: 1, styles: { ...headerStyle7, ...netWidth } },
      ]
    ],
    body: contents
  });

  // GRAND TOTAL
  const grandTotalStyle: any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000", fillColor: "#ffd965" }
  const grandTotalStyleMoney: any = { fontStyle: 'bold', halign: 'right', valign: 'middle', fontSize: 10, textColor: "#000000", fillColor: "#ffd965", cellWidth: 1.5 }
  autoTable(doc, {
    theme: "grid",
    styles: { lineWidth: 0.0005, lineColor: "#000000" },
    head: [
      [
        { content: "GRAND TOTAL  ", colSpan: 5, rowSpan: 1, styles: grandTotalStyle },
        { content: "Php " + moneyFormatter.format(totalSalary).slice(1), colSpan: 1, rowSpan: 1, styles: grandTotalStyleMoney },
      ]
    ]
  })

  // doc.save("Grow " + expense.id + " Payroll.pdf")
  doc.save("payroll_" + start_date.format("YYYY-MM-DD") + "-to-" + end_date.format("YYYY-MM-DD") + ".pdf")
}

export default Payroll2PDF
