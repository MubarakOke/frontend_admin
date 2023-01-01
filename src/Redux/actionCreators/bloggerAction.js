import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const fetchBlogger= (url)=>{
    let uri= "blog/blogger/list/"
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
            dispatch({ type: type.fetchBlogger, payload: response.data });
            dispatch(hideSpinner());
          } 
        catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get bloggers data, please check your internet connection"
            );
        }
    }
}