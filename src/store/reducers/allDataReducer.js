import * as actionTypes from '../actions/types';

const initialState = {
  loading: true,
  confirmed: [],
  recovered: [],
  deaths: [],
  error: '',
  countries: [],
  labels: [],
  selected: null,
};

const allDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_DATA:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.GET_CONFIRMED_DATA:
      return {
        ...state,
        confirmed: action.payload,
      };
    case actionTypes.GET_RECOVERED_DATA:
      return {
        ...state,
        recovered: action.payload,
      };
    case actionTypes.GET_DEATH_DATA:
      return {
        ...state,
        deaths: action.payload,
      };
    case actionTypes.FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case actionTypes.SET_LABEL:
      return {
        ...state,
        labels: action.payload,
      };
    case actionTypes.SET_SELECTED_COUNTRY:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default allDataReducer;
