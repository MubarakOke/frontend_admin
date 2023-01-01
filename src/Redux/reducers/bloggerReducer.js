import * as type from "../actionCreators/types";

export const BloggerListReducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchBlogger):
            return action.payload;
        case type.signoutType:
            return null;
        default:
            return state;
    }
}
