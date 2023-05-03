import "./Calendar.css"

import React, { useState, useEffect } from "react"
import CalendarData from "../../Types/CalendarData"
import { toast } from "react-hot-toast";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { markAttendance } from "../../ApiCalls/EmployeesApi";

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

const Calendar = ({employee_id}:any) => {

    // edit mode state
    const [isEdit, setIsEdit] = useState(false)
    
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
        const temp = [
            {
                date: "2023-05-23",
                status: "present"
            },
            {
                date: "2023-05-25",
                status: "halfday"
            }
        ]

       setData((prev:any) => ({
        ...prev,
        days: days,
        attendance: temp
       })) 
    },[currentMonth])
    
    const handleDateClick = (e:any) => {
        let value = e.target.value.split(" ")
        let clickedDate = value[0]

        let tempAttendance = data.attendance
        let attIdx = tempAttendance.findIndex((a:any)=>a.date==clickedDate)
        let currAttendance = tempAttendance[attIdx]

        // console.log(value[1])
        if (value[1] === "calendar-before-month")
            prevMonth()
        

        if (value[1] === "calendar-after-month")
            nextMonth()
            if (attIdx === -1){
                currAttendance = {
                    date: clickedDate,
                    status: "present"
                }
                tempAttendance.push(currAttendance)
        }
        
        else{
            if (currAttendance.status === "present")
                currAttendance.status = "halfday"
            else if (currAttendance.status === "halfday")
                currAttendance.status = "absent"
            else if (currAttendance.status === "absent")
                currAttendance.status = "present"

            tempAttendance[attIdx] = currAttendance
        }

        markAttendance(employee_id, clickedDate, currAttendance.status)
        .then((response) => {
            console.log(response, tempAttendance)
            if (response.data.status===201){
                setData((prev) => ({...prev, attendance:tempAttendance}))
                toast.success(response.data.message)
            } else {
                toast.success(response.data.message)
            }
        })

        // force rerender
        setData((prev) => ({...prev}))
    }


    const getAttendanceStatus = (date: string) => {
        return data.attendance.find((a)=>a.date===date)?.status || "not-set"
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
            <div className="calendar-header-container">
                <div className="calendar-prev-month-wrapper">
                    <Button
                        type="calendar-prev-next"
                        handleClick={prevMonth}
                        text="&lt;"
                    />
                </div>
                <h2 className="calendar-curr-month-wrapper">
                    {format(firstDayCurrentMonth, " MMMM yyyy")}
                </h2>
                <div className="calendar-next-month-wrapper">
                <Button
                        type="calendar-prev-next"
                        handleClick={nextMonth}
                        text="&gt;"
                    />
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
                <div className="calendar-days-container">
                    {data.days.map((day:Date, i:number) => {
                        return(
                            
                                <OverlayTrigger
                                    key={i}
                                    placement="top"
                                    overlay={
                                        <Tooltip id={"tooltip-"+isEdit? "top":"disabled" }>
                                            <span>
                                                {getAttendanceStatus(format(day, "y-LL-dd")) || "Not set"}
                                            </span>
                                        </Tooltip>
                                    }
                                >
                                    <div
                                        key={i}
                                        className={"calendar-day-wrapper " + getAttendanceStatus(format(day, "y-LL-dd")) + isWithinMonth(day)}
                                    >
                                        <button
                                            // disabled={isBefore(day, today)}
                                            onClick={e => handleDateClick(e)}
                                            value={format(day, "y-LL-dd") + isWithinMonth(day)}
                                            disabled={!isEdit}
                                            style={{ pointerEvents: (!isEdit? "none":"auto") }}
                                        >
                                            {format(day, "d")}
                                        </button>           
                                    </div>              
                                </OverlayTrigger>
                        )
                    })}
                </div>
            </div>
            <div className="calendar-edit-btn-wrapper">
                {
                    !isEdit? 
                        <Button 
                            type="calendar-edit"
                            handleClick={()=>setIsEdit(true)}
                            className="light"
                            text="Enable edit attendance"
                        />
                        : 
                        <Button 
                            type="calendar-edit"
                            handleClick={()=>setIsEdit(false)}
                            className="dark"
                            text="Disable edit attendance"
                        />
                }
            </div>
            
        </div>
    )

}

export default Calendar;