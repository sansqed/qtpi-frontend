import axios from "axios";

export const URL = "https://cf65-49-146-230-12.ap.ngrok.io/"

export const postAPICall = (url:string, data:object) => {
    return axios.post(url, data);
  };