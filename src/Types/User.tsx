type User = {
    id:                 string,
    first_name:         string,
    middle_name:        string,
    last_name:          string
    address:            string,
    contact_no:         string,
    password:           string,
    role_id:            string,
    username:           string,
    confirm_password:   string,
};

export type UserError = {
    id:                 boolean,
    first_name:         boolean,
    middle_name:        boolean,
    last_name:          boolean
    address:            boolean,
    contact_no:         boolean,
    password:           boolean,
    role_id:            boolean,
    username:           boolean,
    confirm_password:   boolean,
}

export const emptyUser = {
    address: "",
    contact_no: "",
    first_name: "",
    id: "",
    middle_name: "",
    last_name: "",
    password: "",
    role_id: "",
    username: "",
    confirm_password: "",
}

export const defaultUserError = {
    first_name: false,
    middle_name: false,
    last_name: false,
    address: false,
    contact_no: false,
    id: false,
    password: false,
    role_id: false,
    username: false,
    confirm_password: false,
}

export default User;