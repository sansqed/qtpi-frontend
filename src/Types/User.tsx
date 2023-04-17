type User = {
    added_by: string,
    added_on: string,
    address: string,
    contact_no: string,
    first_name: string,
    id: string,
    is_deleted: string,
    last_name: string,
    middle_name: string,
    password: string,
    role_id: string,
    token: string,
    token_expiry: string,
    updated_by: string,
    updated_on: string,
    username: string,
};

export const emptyUser = {
    added_by: "",
    added_on: "",
    address: "",
    contact_no: "",
    first_name: "",
    id: "",
    is_deleted: "",
    last_name: "",
    middle_name: "",
    password: "",
    role_id: "",
    token: "",
    token_expiry: "",
    updated_by: "",
    updated_on: "",
    username: "",
}

export default User;