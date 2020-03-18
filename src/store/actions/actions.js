import * as actionTypes from './types';
import * as d3 from 'd3-fetch';
import {urls} from '../../config/constants';

export const getWorldData = (param = null) => {
  if (param) {
    //make request for worldwide data
  }

  // make reqeust for country wise data,
};

export const getData = () => async dispatch => {
  try {
    let promises = [];
    urls.map((url, index) => {
      let promise = d3.dsv(',', url, d => {
        return {
          country: d['Country/Region'],
          state: d['Province/State'],
          latitude: +d.Lat,
          longitude: +d.Long,
          data: parseTimedData(d),
        };
      });
      promises.push(promise);
    });

    Promise.all(promises)
      .then(data => {
        data[0].push({
          type: 'confirmed',
          country: '-- World --',
          state: '',
          latitude: 0,
          longitude: 0,
          data: parseWorldData(data[0][0].data, data[0]),
        });

        data[1].push({
          type: 'recovered',
          country: '-- World --',
          state: '',
          latitude: 0,
          longitude: 0,
          data: parseWorldData(data[1][0].data, data[1]),
        });

        data[2].push({
          type: 'deaths',
          country: '-- World --',
          state: '',
          latitude: 0,
          longitude: 0,
          data: parseWorldData(data[2][0].data, data[2]),
        });

        dispatch({
          type: actionTypes.GET_CONFIRMED_DATA,
          payload: data[0],
        });
        dispatch({
          type: actionTypes.GET_DEATH_DATA,
          payload: data[1],
        });
        dispatch({
          type: actionTypes.GET_RECOVERED_DATA,
          payload: data[2],
        });
        dispatch({
          type: actionTypes.SET_COUNTRIES,
          payload: setCountries(data[0]),
        });
        dispatch({
          type: actionTypes.SET_LABEL,
          payload: setLabels(data[0]),
        });
        dispatch({
          type: actionTypes.SET_SELECTED_COUNTRY,
          payload: data[0].length - 1,
        });
        dispatch({
          type: actionTypes.LOADING_DATA,
          payload: false,
        });
        console.log(data);
      })
      .catch(e => {
        console.log(e);
        dispatch({
          type: actionTypes.FETCH_FAILED,
          payload: e.stack.toString(),
        });
      });
  } catch (e) {
    dispatch({
      type: actionTypes.FETCH_FAILED,
      payload: e.stack.toString(),
    });
    console.log(e);
  }
};

export const getStats = () => {};

export const countryNameCalculator = (c, s) => {
  if (c) {
  }

  return false;
};

export const parseTimedData = d => {
  let data = {};
  let skip = ['Province/State', 'Country/Region', 'Lat', 'Long'];
  Object.keys(d)
    .reverse()
    .slice(0, 10)
    .reverse()
    .forEach(each => {
      if (skip.indexOf(each) < 0) {
        data[each.split('/')[1]] = +d[each];
      }
    });
  // for (let key in d) {

  // }

  return data;
};

export const parseWorldData = (d, dataset) => {
  var series = {};

  for (let key in d) {
    var cnt = 0;
    for (var i = 0; i < dataset.length; i++) {
      cnt += +dataset[i]['data'][key];
    }
    series[key] = cnt;
  }

  return series;
};

export const setCountries = data => {
  let countries = [];
  for (let key in data) {
    if (data[key].country) {
      countries.push({
        key: key,
        value: data[key].country,
      });
    }
  }
  return countries;
};

export const setLabels = data => {
  let labels = [];
  for (let key in data) {
    if (data[key].country) {
      labels.push(data[key].data);
    }
  }
  return labels;
};
