import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";
import { generateParsedDate } from "../../Utils/dateUtils"

export const fetchTodayOrder= (url)=>{
    let uri= "admin/history/"
    return async (dispatch, getState)=>{
        const token = getState().auth.token
        try {
            dispatch(showSpinner())
            const response = await baseApi.get(url||uri,
              {
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch({ type: type.fetchTodayOrder, payload: response.data.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get today order, please check your internet connection"
            );
        }
    }
}

export const fetchThisWeekOrder= (week, url="admin/history/", )=>{
    let uri= `${url}?week=${week}`
    return async (dispatch, getState)=>{
        const token = getState().auth.token
        try {
            dispatch(showSpinner())
            const response = await baseApi.get(uri,
              {
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch({ type: type.fetchThisWeekOrder, payload: response.data.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get this week order, please check your internet connection"
            );
        }
    }
}

export const fetchDateOrder= (date, url="admin/history/")=>{
    let uri= `${url}?date=${date}`
    return async (dispatch, getState)=>{
        const token = getState().auth.token
        try {
            dispatch(showSpinner())
            const response = await baseApi.get(uri,
              {
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch({ type: type.fetchDateOrder, payload: response.data.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get order for this date, please check your internet connection"
            );
        }
    }
}

export const setDateOrder= (date)=>{
  return {type:type.setSelectedDate, payload: generateParsedDate(date)}
}