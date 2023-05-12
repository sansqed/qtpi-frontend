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
    const [isEdit, setIsEdit] = useState(false)
    const [showPopover, setShowPopover] = useState(false)
    
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
       
    },[currentMonth])

    const handleSetAttendance = (e:any) => {
        let value = e.target.value.split(" ")
        let date = value[0]
        let status = value[1]

        let tempAttendance = data.attendance
        let attIdx = tempAttendance.findIndex((a:any)=>a.date==date && employee_id==a.employee_id)
        let currAttendance = tempAttendance[attIdx]

        

        if (currAttendance === undefined){
            currAttendance = {
                id: "-1",
                employee_id: employee_id,
                date: date,
                status: status
            }
            tempAttendance.push(currAttendance)

            markAttendance(employee_id, date, status)
            .then((response:any) =>{
                if (response.data.status==="201"){
                    setData((prev) => ({...prev, attendance:tempAttendance}))
                    toast.success(response.data.message)
                } else {
                    toast.success(response.data.message)
                }
            })
        } else {
            changeStatus(currAttendance.id, status)
            .then((response)=>{
                if (response.data.status==="201"){
                    currAttendance.status = status
                    tempAttendance[attIdx] = currAttendance
                    setData((prev) => ({...prev, attendance:tempAttendance}))
                    toast.success(response.data.message)
                } else {
                    toast.success(response.data.message)
                }

            })
        }
        
        // force rerender
        setData((prev) => ({...prev}))
        document.body.click()

        if (value[2] === "calendar-before-month")
            prevMonth()
        
        if (value[2] === "calendar-after-month")
            nextMonth()
        
    }

    console.log(data)

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
                <div className="calendar-edit-btn-wrapper">
                    {
                        !isEdit? 
                            <Button 
                                type="calendar-edit"
                                handleClick={()=>setIsEdit(true)}
                                className="light"
                                text="Mark attendance"
                            />
                            : 
                            <Button 
                                type="calendar-edit"
                                handleClick={()=>setIsEdit(false)}
                                className="dark"
                                text="Done marking"
                            />
                    }
                </div>
            </div>
            
            <div className="calendar-header-container">
                <div className="calendar-prev-month-wrapper">
                    <Button
                        type="calendar-prev-next"
                        handleClick={prevMonth}
                        text="&lt;"
                    />
                </div>
                <h3 className="calendar-curr-month-wrapper">
                    {format(firstDayCurrentMonth, " MMMM yyyy")}
                </h3>
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
                                    trigger={isEdit? "click":"hover"}
                                    rootClose
                                    overlay={isEdit?
                                        <Popover id="popover-basic" show={showPopover}>
                                            <Popover.Header as="h4">Attendance: {format(day, "y MMM d")}</Popover.Header>
                                            <Popover.Body>
                                                <Button
                                                    type="calendar-attendance-status"
                                                    handleClick={(e:any)=>{handleSetAttendance(e)}}
                                                    text="Present"
                                                    className="present"
                                                    value={format(day, "y-LL-dd") + " present" +  isWithinMonth(day)}
                                                />
                                                <Button
                                                    type="calendar-attendance-status"
                                                    handleClick={(e:any)=>{handleSetAttendance(e)}}
                                                    text="Halfday"
                                                    className="halfday"
                                                    value={format(day, "y-LL-dd") + " halfday" }
                                                />
                                                <Button
                                                    type="calendar-attendance-status"
                                                    handleClick={(e:any)=>{handleSetAttendance(e)}}
                                                    text="Absent"
                                                    className="absent"
                                                    value={format(day, "y-LL-dd") + " absent" +  isWithinMonth(day)}
                                                />
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
                                        className={"calendar-day-wrapper " + getAttendanceStatus(format(day, "y-LL-dd")) + isWithinMonth(day) + (isToday(day)? " today":"")}
                                    >
                                        <button
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
            
            
        </div>
    )

}

export default Calendar;