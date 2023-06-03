import axios from "axios";

export const URL = "http://api.qtpi.ninja:8080/"

axios.defaults.headers.common = {
  "api-key": "448b450c-83b0-48b8-bab6-a15d58111050"
};

export const postAPICall = (url:string, data:object) => {
    return axios.post(url, data);
  };

export const getAPICall = (url:string, data:object) => {
  return axios.get(url, data);
};