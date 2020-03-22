import * as actionTypes from './types';
import * as d3 from 'd3-fetch';
import {urls} from '../../config/constants';
import _ from 'lodash';

let ALL_DATA;

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

    let data = await Promise.all(promises).catch(e => {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_FAILED,
        payload: e.stack.toString(),
      });
    });
    data[0].push({
      type: 'confirmed',
      country: 'WorldWide',
      state: '',
      latitude: 0,
      longitude: 0,
      data: parseWorldData(data[0][0].data, data[0]),
    });

    data[1].push({
      type: 'recovered',
      country: 'WorldWide',
      state: '',
      latitude: 0,
      longitude: 0,
      data: parseWorldData(data[1][0].data, data[1]),
    });

    data[2].push({
      type: 'deaths',
      country: 'WorldWide',
      state: '',
      latitude: 0,
      longitude: 0,
      data: parseWorldData(data[2][0].data, data[2]),
    });
    let country_idx_confirmed = data[0].length - 1;
    let country_idx_recovered = data[1].length - 1;
    let country_idx_deaths = data[2].length - 1;

    dispatch({
      type: actionTypes.GET_TIME_LAPSE_DATA,
      payload: {
        confirmed: data[0],
        recovered: data[1],
        deaths: data[2],
        countries: setCountries(data[0]),
        selected: data[0].length - 1,
        confirmedCount: _.max(_.values(data[0][country_idx_confirmed].data)),
        recoveredCount: _.max(_.values(data[1][country_idx_recovered].data)),
        deathCount: _.max(_.values(data[2][country_idx_deaths].data)),
      },
    });
    ALL_DATA = data;
    // dispatch({
    //   type: actionTypes.GET_CONFIRMED_DATA,
    //   payload: data[0],
    // });
    // dispatch({
    //   type: actionTypes.GET_DEATH_DATA,
    //   payload: data[1],
    // });
    // dispatch({
    //   type: actionTypes.GET_RECOVERED_DATA,
    //   payload: data[2],
    // });
    // dispatch({
    //   type: actionTypes.SET_COUNTRIES,
    //   payload: setCountries(data[0]),
    // });
    // dispatch({
    //   type: actionTypes.SET_LABEL,
    //   payload: setLabels(data[0]),
    // });
    // dispatch({
    //   type: actionTypes.SET_SELECTED_COUNTRY,
    //   payload: data[0].length - 1,
    // });
    dispatch({
      type: actionTypes.LOADING_DATA,
      payload: false,
    });
    // console.log(data);
  } catch (e) {
    dispatch({
      type: actionTypes.FETCH_FAILED,
      payload: e.stack.toString(),
    });
    console.log(e);
  }
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
      let value = data[key].country;
      if (data[key].state) {
        value += `/${data[key].state}`;
      }
      countries.push({
        key: key,
        value: value,
      });
    }
  }
  countries.push({key: data.length, value: 'WorldWide'});
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

export const setCountry = data => async dispatch => {
  // const {confirmed, recovered, deaths} = store.getState();
  dispatch({
    type: actionTypes.SET_SELECTED_COUNTRY,
    payload: {
      selected: data,
      confirmedCount: _.max(_.values(ALL_DATA[0][data].data)),
      recoveredCount: _.max(_.values(ALL_DATA[1][data].data)),
      deathCount: _.max(_.values(ALL_DATA[2][data].data)),
    },
  });
};
