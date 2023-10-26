import * as types from "./actionTypes";

const initialState ={
    isLoading:false,
    isError:false,
    token:"",
    userDetails:{},
    isAuth:false
}

export const reducer = (state=initialState,action )=>{
    const {type,payload}=action;

    switch(type){
        case types.USER_LOGIN_REQUEST:
        return {
                ...state,
                isAuth:false,
                isLoading:true,
                isError:false
        }
        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isAuth:true,
                isLoading:false,
                isError:false,
                token:payload.token,
                userDetails:payload.user
            }
        case types.USER_LOGIN_FAILURE:
            return {
                ...state,
                isAuth:false,
                isLoading:false,
                isError:true
            }  

            case types.USER_SIGNUP_REQUEST:
        return {
                ...state,
                isLoading:true,
                isError:false
        }
        case types.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                token:payload.token,
                userDetails:payload.user
            }
        case types.USER_SIGNUP_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true
            }  
        default:
            return state      
    }

}