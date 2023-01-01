import * as type from "./types";
import baseApi from "../../Api/baseApi";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const SignInAction = (navigate, formData) => {
  
  return async (dispatch) => {
    try {
      dispatch({type: type.errorLogin, payload: null})
      dispatch(showSpinner())
      const res= await baseApi.post("/account/auth/admin/", formData)
      dispatch({ type: type.signinType, payload: res.data }) 
      navigate("/dashboard");
      dispatch(hideSpinner())
      
    } catch (error) {
      dispatch(hideSpinner())
      dispatch({type: type.errorLogin, payload: {"login": error.response.data.error}})
    }
  };
};