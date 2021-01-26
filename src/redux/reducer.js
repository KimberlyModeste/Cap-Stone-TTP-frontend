import { GET_ALL_POSTS, SAVE_ALL_POSTS } from './actions'  



export default function reducer(state, action){

    switch (action.type) {

        case GET_ALL_POSTS: {
            console.log("I AM RETURNING ALL POSTS!!!!!")
            return state
        }

        case SAVE_ALL_POSTS: {
            
            console.log("I AM SAVING ALL POSTS!!!!!")
            return {
                posts: action.payload
            }
        }
        case 'LOGIN':
        return {
            ...state,
            user: action.payload
        };
        case 'LOGOUT':
        return {
            ...state,
            user: null
        };
        default:
            return state;
    }

}