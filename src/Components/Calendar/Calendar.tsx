import "./Calendar.css"
import "../../App.css"

import React, { useState, useEffect } from "react"
import CalendarData from "../../Types/CalendarData"
import { toast } from "react-hot-toast";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import { markAttendance, getAttendance, changeStatus } from "../../ApiCalls/EmployeesApi";

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
import { SyntheticEventData } from "react-dom/test-utils";

const Calendar = ({employee_id}:any) => {

    // edit mode state
    const [isEdit, setIsEdit] = useState(true)
    const [showPopover, setShowPopover] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    const [data, setData] = useState<CalendarData>({
        days:[],
        attendance: []
    })

    let today = startOfToday()
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
        
        getAttendance(
            employee_id, 
            format(startOfWeek(firstDayCurrentMonth, { weekStartsOn: 0 }), "y-LL-dd"), 
            format(endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 0 }), "y-LL-dd"))
        .then((response:any) => {
            console.log(response)

            if (response?.data?.status==="200"){
                setData((prev:any) => ({
                    ...prev,
                    days: days,
                    attendance: response.data.data.attendance
                }))                 
            } else {
                setData((prev:any) => ({
                    ...prev,
                    days: days,
                }))  
            }
        })
       setIsChanged(false)
    },[currentMonth, isChanged])

    const handleSetAttendance = (e:any) => {
        const status = e.target.name
        const date = e.target.value

        const attendance = data.attendance.find((a)=>a.date===date)
        if(attendance === undefined){
            markAttendance(employee_id, date, status)
        } else {
            changeStatus(attendance.id, status)
        }

        setIsChanged(true)
    }

    const handleCurrMonthClick = () =>{
        setCurrentMonth(format(today, "MMM-yyyy"))
    }


    const getAttendanceStatus = (date: string) => {
        return data.attendance.find((a)=>a.date===date && employee_id==a.employee_id)?.status || "unset"
    }

    const isWithinMonth = (day: Date) => {
        if (isBefore(day, firstDayCurrentMonth))
            return " calendar-before-month"
        if (isAfter(day, endOfMonth(firstDayCurrentMonth)))
            return " calendar-after-month"
        return " calendar-within-month"
    }

    return(
        <div className="calendar-container">
            <div className="calendar-title-container">
                <div className="calendar-title-wrapper">
                    <h2>
                        ATTENDANCE
                    </h2>
                </div>

                <div className="calendar-header-container">
                    <div className="calendar-prev-month-wrapper">
                        <Button
                            type="calendar-prev-next"
                            handleClick={prevMonth}
                            text="&lt;"
                        />
                    </div>
                        <button className="calendar-curr-month-wrapper" onClick={handleCurrMonthClick}>
                            <h3>
                                {format(firstDayCurrentMonth, " MMMM yyyy")}
                            </h3>
                        </button>
                    <div className="calendar-next-month-wrapper">
                        <Button
                            type="calendar-prev-next"
                            handleClick={nextMonth}
                            text="&gt;"
                        />
                    </div>
                </div>
            </div>

            <div className="calendar-body">
                <div className="calendar-daynames-container">
                    {dayNames.map((day, i) => {
                    return(
                        <div
                            key={i}
                            className={"calendar-daynames"}
                        >
                            {day}
                        </div>
                    )})}
                </div>
                <div className={"calendar-days-container" + (data.days.length/7===6? " six-rows":" five-rows")}>
                    {data.days.map((day:Date, i:number) => {
                        return(
                            
                                <OverlayTrigger
                                    key={i}
                                    placement="top"
                                    trigger={isEdit? "click":["hover", "focus"]}
                                    rootClose
                                    overlay={isEdit?
                                        <Popover id="popover-contained" show={showPopover} className="calendar-popover">
                                            <Popover.Header>Set attendance</Popover.Header>
                                            <Popover.Body>
                                                <div className="calendar-attendance-btn-wrapper">
                                                    <Button
                                                        type="calendar-attendance-status-v2"
                                                        handleClick={(e:any)=>{handleSetAttendance(e)}}
                                                        state={getAttendanceStatus(format(day, "y-LL-dd"))}
                                                        value={format(day, "y-LL-dd")}
                                                    />
                                                </div>
                                            </Popover.Body>
        
                                        </Popover>:
                                        <Tooltip id={"tooltip-"+isEdit? "top":"disabled" }>
                                            <span>
                                                {getAttendanceStatus(format(day, "y-LL-dd"))}
                                            </span>
                                        </Tooltip>
                                    }
                                >
                                    <div
                                        key={i}
                                        className={"calendar-day-wrapper" + isWithinMonth(day) + (isToday(day)? " today":"") + (!isEdit? " disabled":"")}
                                    >   
                                        <div className={"calendar-day-attendance " + getAttendanceStatus(format(day, "y-LL-dd"))}>
                                            <button
                                                value={format(day, "y-LL-dd") + isWithinMonth(day)}
                                                disabled={!isEdit}
                                                style={{ pointerEvents: (!isEdit? "none":"auto") }}
                                            >
                                                {format(day, "d")}
                                            </button>           
                                        </div>
                                    </div>              
                                </OverlayTrigger>
                        )
                    })}
                </div>
            </div>
            
            
        </div>
    )

}

export default Calendar;