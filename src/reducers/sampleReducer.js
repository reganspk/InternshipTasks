import {
  DATA_ATTEMPT,
  DATA_FAILURE,
  DATA_SUCCESS,
  POST_ATTEMPT,
  POST_FAILURE,
  POST_SUCCESS,
} from '../actions/actionSample';

/* function sampleReducer(state = {}, action) {
  switch (action.type) {
    case 'SUCCESS':
      console.log(action.payload);
      return {
        success: true,
        data: action.payload,
      };

    default:
      return state;
  }
} */
function sampleReducer(state = {}, action) {
  switch (action.type) {
    case DATA_ATTEMPT:
      return {...state, isFetching: true, isError: false};

    case DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        response: action.payload,
      };
    case DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };

    default:
      return state;
  }
}
function postReducer(state = {}, action) {
  switch (action.type) {
    case POST_ATTEMPT:
      return {...state, isFetching: true, isError: false};

    case POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        postresponse: action.payload,
      };
    case POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };

    default:
      return state;
  }
}

export {sampleReducer, postReducer};
