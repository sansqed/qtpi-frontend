type Employee = {
    id:                 string,
    first_name:         string,
    middle_name:        string,
    last_name:          string
    address:            string,
    contact_no:         number,
    position:           string,
    rate: number,
    rate_unit: string,
    sss: number,
};

export type EmployeeError = {
    id:                 boolean,
    first_name:         boolean,
    middle_name:        boolean,
    last_name:          boolean
    address:            boolean,
    contact_no:         boolean,
    position:           boolean,
    rate:               boolean,
    rate_unit:          boolean,
    sss:                boolean,
}

export const emptyEmployee = {
    address: "",
    contact_no: 0,
    first_name: "",
    id: "",
    middle_name: "",
    last_name: "",
    position: "",
    rate: 0,
    rate_unit: "",
    sss: 0,
}

export const defaultEmployeeError = {
    first_name: false,
    middle_name: false,
    last_name: false,
    address: false,
    contact_no: false,
    id: false,
    position: false,
    rate: false,
    rate_unit: false,
    sss: false,
}

export default Employee;
