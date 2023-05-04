type Attendance = {
    id: string,
    employee_id: string,
    date: string,
    status: "present" | "halfday" | "absent",
}

export default Attendance;