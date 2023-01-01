import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const fetchDashboard= ()=>{

    return async (dispatch, getState)=>{
        const token = getState().auth.token
        try {
            dispatch(showSpinner())
            const response = await baseApi.get("admin/monitor/",
              {
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch({ type: type.fetchDashboard, payload: response.data.data });
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