import { combineReducers } from "redux";
import AccountReducer from "./accountReducer"
import SpinnerReducer from "./spinnerReducer";
import ErrorReducer from "./errorReducer";
import DashboardReducer from "./dashboardReducer";
import { RequestedErrandereducer, VerifiedErrandereducer, DeclinedErrandereducer, SelectedErrandereducer } from "./erranderReducer";
import { CustomerListReducer, SelectedCustomereducer } from "./customerReducer";
import { TodayOrderReducer, ThisWeekOrderReducer, DateOrderReducer, selectedDateReducer } from "./orderReducer";
import { BloggerListReducer } from "./bloggerReducer";


export default combineReducers({
  selectedDate: selectedDateReducer,
  TodayOrder: TodayOrderReducer,
  ThisWeekOrder: ThisWeekOrderReducer,
  DateOrder: DateOrderReducer,
  SelectedErrander: SelectedErrandereducer,
  SelectedCustomer: SelectedCustomereducer,
  BloggerList: BloggerListReducer,
  CustomerList: CustomerListReducer,
  RequestedErrander: RequestedErrandereducer,
  VerifiedErrander: VerifiedErrandereducer,
  DeclinedErrander: DeclinedErrandereducer,
  dashboard: DashboardReducer,
  auth: AccountReducer,
  spinner: SpinnerReducer,
  error: ErrorReducer,
});
