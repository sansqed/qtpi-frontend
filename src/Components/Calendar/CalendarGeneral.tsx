import "./CalendarGeneral.css"
import "../../App.css"

import React, { useState, useEffect } from "react"
import CalendarData from "../../Types/CalendarData"
import { toast } from "react-hot-toast";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import { markAttendance, getAttendance, changeStatus } from "../../ApiCalls/EmployeesApi";
import Employee from "../../Types/Employee";
import { Input, Space } from 'antd';
import { getFullName } from "../../Helpers/Util";


import {
    add,
    addDays,
    addHours,
    eachDayOfInterval,
    eachMinuteOfInterval,
    endOfDay,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isAfter,
    isBefore,
    isEqual,
    isSameMonth,
    isThisMonth,
    isToday,
    parse,
    parseISO,
    set,
    startOfDay,
    startOfToday,
    startOfWeek,
    startOfYesterday,
  } from "date-fns"

import Button from "../Button/Button"

interface CalendarProps{
    employees: Employee[];
}

const CalendarGeneral: React.FC<CalendarProps> = ({employees}) => {
    const { Search } = Input;
    const [employeeList, setEmployeeList] = useState(employees)
    const [searchResult, setSearchResult] = useState(employeeList)
    const [searchEntry, setSearchEntry] = useState("")
    const [isChanged, setIsChanged] = useState(false)
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    const [data, setData] = useState<CalendarData>({
        days:[],
        attendance: []
    })

    let today = startOfToday()
    const [clickedDay, setClickedDay] = useState(format(today, "y-LL-dd"))
    let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())

    // next and prev month functions
    const prevMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
    }
    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
    }

    // re renders everytime the current month changes
    useEffect(()=>{
        const days = eachDayOfInterval({
            start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 0 }),
            end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 0 }),
        })

        // temp data, to be replaced when get attendance api is available
        setData((prev:any) => ({
            ...prev,
            days: days,
        }))  
        
        getAttendance(
            "", 
            format(startOfWeek(firstDayCurrentMonth, { weekStartsOn: 0 }), "y-LL-dd"), 
            format(endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 0 }), "y-LL-dd"))
        .then((response:any) => {

            if (response?.data?.status==="200"){
                var tempList = employees?.map((e)=>{
                    var attendance = response.data.data.attendance.filter(({employee_id}:any)=>employee_id===e.id)                    
                    return({...e, attendance:attendance})
                })
                setEmployeeList(tempList)
            } 
        })

        setIsChanged(false)
       
    },[isChanged,currentMonth, employees])
    
    const handleDayClick = (e:any) =>{
        setClickedDay(e.target.value.split(" ")[0])

    }
    
    const handleCurrMonthClick = () =>{
        setCurrentMonth(format(today, "MMM-yyyy"))
    }


    const isWithinMonth = (day: Date) => {
        if (isBefore(day, firstDayCurrentMonth))
            return " calendar-before-month"
        if (isAfter(day, endOfMonth(firstDayCurrentMonth)))
            return " calendar-after-month"
        return " calendar-within-month"
    }

    const onSearch = (e: any) => {
        setSearchEntry(e)
    };
    

    const handleSetAttendance = (e:any) => {
        const name = e.target.name
        const employeeIdx = e.target.value
        const employeeId = employeeList[employeeIdx].id
        const attendanceIdx = employeeList?.[employeeIdx]?.attendance?.findIndex(({date})=>(date===clickedDay))

        if (attendanceIdx===undefined)
            return
        if(attendanceIdx > -1){
            const attendanceId = employeeList?.[employeeIdx]?.attendance?.[attendanceIdx].id
            if (employeeList?.[employeeIdx].attendance?.find(({date})=>(date===clickedDay))?.status===name)
                return

            changeStatus(attendanceId, name)
        } else {
            markAttendance(employeeId, clickedDay, name)
            
        }
        setIsChanged(true)
    }

    // console.log(isChanged)

    return(
        <div className="calendar-gen-container">
            <div className="calendar-gen-title-container">
                <div className="calendar-gen-title-wrapper">
                    <h2>
                        ATTENDANCE
                    </h2>
                </div>
            </div>

            
            <div className="calendar-gen-body">
                <div className="calendar-gen-calendar-container">
                    <div className="calendar-gen-header-container">
                        <div className="calendar-gen-prev-month-wrapper">
                            <Button
                                type="calendar-prev-next"
                                handleClick={prevMonth}
                                text="&lt;"
                            />
                        </div>
                        <button className="calendar-gen-curr-month-wrapper" onClick={handleCurrMonthClick}>
                            <h3>
                                {format(firstDayCurrentMonth, " MMMM yyyy")}
                            </h3>
                        </button>
                        <div className="calendar-gen-next-month-wrapper">
                        <Button
                                type="calendar-prev-next"
                                handleClick={nextMonth}
                                text="&gt;"
                            />
                        </div>
                    </div>
                    <div className={"calendar-gen-calendar-grid"}>
                        <div className="calendar-gen-daynames-container">
                            {dayNames.map((day, i) => {
                            return(
                                <div
                                    key={i}
                                    className={"calendar-gen-daynames"}
                                >
                                    {day}
                                </div>
                            )})}
                        </div>
                        <div className={"calendar-gen-days-container"  + (data.days.length/7===6? " six-rows":" five-rows")}>
                            {data.days.map((day:Date, i:number) => {
                                return(
                                    <div
                                        key={i}
                                        className={"calendar-gen-day-wrapper " + isWithinMonth(day) + (format(day, "y-LL-dd")===clickedDay? " clicked":"")}
                                    >
                                        <div className={"calendar-gen-today" + (isToday(day)? " today":"")}>

                                            <button
                                                value={format(day, "y-LL-dd") + isWithinMonth(day)}
                                                // style={{ pointerEvents: (!isEdit? "none":"auto") }}
                                                onClick={e=>{handleDayClick(e)}}
                                            >
                                                {format(day, "d")}
                                            </button>           
                                        </div>
                                    </div>              
                                )
                            })}
                        </div>
                    </div>
                    </div>

                <div className="calendar-gen-employees-container">
                    <text className="calendar-gen-employees-title">Set attendance for {clickedDay}</text>
                    <div className="calendar-gen-employees-body">
                        <Search placeholder="Enter employee name" onSearch={onSearch} style={{ width: "100%" }} />
                        <div className="calendar-gen-search-container">
                            { 
                                employeeList?.map((e, idx)=>{
                                    const fullName = getFullName(e.first_name, e.middle_name, e.last_name);
                                    if (fullName.toLowerCase().includes(searchEntry.toLowerCase()))
                                        return(
                                            <div className="calendar-gen-employee-wrapper">
                                                <span className="calendar-gen-employee-name">
                                                    {e.first_name + ' ' + e.middle_name + ' ' + e.last_name}
                                                </span>
                                                <div className="calendar-gen-attendance-btn-wrapper">
                                                    <Button
                                                        type="calendar-attendance-status-v2"
                                                        handleClick={(e:any)=>{handleSetAttendance(e)}}
                                                        state={e.attendance?.find(({date})=>date==clickedDay)?.status||""}
                                                        value={String(idx)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                })
                            }
                        </div>
                    </div>
                </div> 

            </div>

            
            
            
        </div>
    )

}

export default CalendarGeneral;