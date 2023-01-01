import * as type from "../actionCreators/types";

export const CustomerListReducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchCustomerData):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const SelectedCustomereducer= (state=null, action)=>{
    switch(action.type){
        case (type.selectedCustomer):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}