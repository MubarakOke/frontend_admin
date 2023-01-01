import * as type from "../actionCreators/types";

const INITIAL_STATE = null;

const DashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.fetchDashboard:
      return {...action.payload};
    case type.signoutType:
      return null;
    default:
      return state;
  }
};

export default DashboardReducer; 