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
  confirmedCount: 0,
  recoveredCount: 0,
  deathCount: 0,
};

const allDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_DATA:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.GET_TIME_LAPSE_DATA:
      return {
        ...state,
        confirmed: action.payload.confirmed,
        recovered: action.payload.recovered,
        deaths: action.payload.deaths,
        countries: action.payload.countries,
        selected: action.payload.selected,
        confirmedCount: action.payload.confirmedCount,
        recoveredCount: action.payload.recoveredCount,
        deathCount: action.payload.deathCount,
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
        selected: action.payload.selected,
        confirmedCount: action.payload.confirmedCount,
        recoveredCount: action.payload.recoveredCount,
        deathCount: action.payload.deathCount,
      };
    default:
      return state;
  }
};

export default allDataReducer;
