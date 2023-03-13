import axios from "axios";

export const URL = ""

export const postAPICall = (url:string, data:object) => {
    return axios.post(url, data);
  };