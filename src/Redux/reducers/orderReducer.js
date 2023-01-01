import * as type from "../actionCreators/types";
import { generateTodayDate } from "../../Utils/dateUtils";

export const TodayOrderReducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchTodayOrder):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const ThisWeekOrderReducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchThisWeekOrder):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const DateOrderReducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchDateOrder):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const selectedDateReducer= (state=generateTodayDate(), action)=>{
    switch(action.type){
        case type.setSelectedDate:
            return action.payload
        case type.signoutType:
            return state;
        default:
            return state;
    }
};

