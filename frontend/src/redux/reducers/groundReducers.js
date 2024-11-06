import {
  FETCH_GROUNDS_REQUEST_USER,
  FETCH_GROUNDS_SUCCESS_USER,
  FETCH_GROUNDS_FAILURE_USER,
  UPDATE_GROUND_REQUEST,
  UPDATE_GROUND_SUCCESS,
  UPDATE_GROUND_FAILURE
} from '../actions/groundActions';

const initialState = {
  grounds: {
    grounds: [], // array of ground objects
    userGrounds: [],
    loading: false,
    error: null,
  },
};

const groundReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GROUNDS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_GROUNDS_SUCCESS':
      return {
        ...state,
        loading: false,
        grounds: action.payload,
      };
    case 'FETCH_GROUNDS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case FETCH_GROUNDS_REQUEST_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GROUNDS_SUCCESS_USER:
      return {
        ...state,
        loading: false,
        grounds: action.payload,
      };
    case FETCH_GROUNDS_FAILURE_USER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      // Update Ground Cases
    case UPDATE_GROUND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case UPDATE_GROUND_SUCCESS:
      debugger;
      return {
        ...state,
        loading: false,
        grounds: state.grounds.grounds.map(ground =>
          ground.id === action.payload.id ? action.payload : ground
        ), // Update the specific ground in the array
      };
    case UPDATE_GROUND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };



    default:
      return state;
  }
};

export default groundReducer;
