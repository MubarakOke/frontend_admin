import * as type from "../actionCreators/types";

export const RequestedErrandereducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchErranderRequested):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const VerifiedErrandereducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchErranderVerified):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const DeclinedErrandereducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchErranderDeclined):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const SelectedErrandereducer= (state=null, action)=>{
    switch(action.type){
        case (type.selectedErrander):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}