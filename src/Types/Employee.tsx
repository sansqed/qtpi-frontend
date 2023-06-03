type Employee = {
    id:                 string,
    first_name:         string,
    middle_name:        string,
    last_name:          string
    address:            string,
    contact_no:         string,
    position:           string,
    rate:               string,
    payout:             string,
    sss:                string,
    attendance?:        any[],
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
    payout:             boolean,
    sss:                boolean,
}

export const emptyEmployee = {
    address: "",
    contact_no: "",
    first_name: "",
    id: "",
    middle_name: "",
    last_name: "",
    position: "",
    rate: "",
    payout: "",
    sss: "",
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
    payout: false,
    sss: false,
}

export default Employee;
