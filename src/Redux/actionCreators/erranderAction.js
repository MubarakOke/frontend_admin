import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const fetchErranderRequested= (url)=>{
    let uri= "errander/requested/list/"
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
            dispatch({ type: type.fetchErranderRequested, payload: response.data.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get dashboard data, please check your internet connection"
            );
        }
    }
}

export const fetchErranderVerified= (url)=>{
    let uri= "errander/verified/list/"
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
            dispatch({ type: type.fetchErranderVerified, payload: response.data.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get verified errander data, please check your internet connection"
            );
        }
    }
}

export const fetchErranderDeclined= (url)=>{
    let uri= "errander/declined/list/"
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
            dispatch({ type: type.fetchErranderDeclined, payload: response.data.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get declined errander data, please check your internet connection"
            );
        }
    }
}

export const setSelectedErrander= (errander)=>{
  return {type: type.selectedErrander, payload:errander}
}

export const fetchSelectedErrander= (id)=>{

  return async (dispatch, getState)=>{
      const token = getState().auth.token

      try {
          dispatch(showSpinner())
          const response = await baseApi.get(`/errander/${id}/`,{headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}});
          dispatch({ type: type.selectedErrander, payload: response.data.data });
          dispatch(hideSpinner());
        } catch {
          dispatch(hideSpinner());
          toast.error(
            "Cannot get errander details, please check your internet connection"
          );
        }
  }
}