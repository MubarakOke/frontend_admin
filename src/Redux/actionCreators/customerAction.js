import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const fetchCustomerData= (url)=>{
    let uri= "customer/list/"
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
            dispatch({ type: type.fetchCustomerData, payload: response.data.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get customers data, please check your internet connection"
            );
        }
    }
}

export const setSelectedCustomer= (customer)=>{
    return {type: type.selectedCustomer, payload:customer}
  }
  
  export const fetchSelectedCustomer= (id)=>{
  
    return async (dispatch, getState)=>{
        const token = getState().auth.token
  
        try {
            dispatch(showSpinner())
            const response = await baseApi.get(`/customer/${id}/`,{headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}});
            dispatch({ type: type.selectedCustomer, payload: response.data.data });
            dispatch(hideSpinner());
          } catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get customer details, please check your internet connection"
            );
          }
    }
  }