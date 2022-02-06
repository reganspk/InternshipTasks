import {ofType} from 'redux-observable';

import {catchError, switchMap, mergeMap} from 'rxjs/operators';

import {
  DATA_ATTEMPT,
  DATA_SUCCESS,
  DATA_FAILURE,
  POST_ATTEMPT,
  POST_SUCCESS,
  POST_FAILURE,
} from '../actions/actionSample';
//constants folder api auta class
import Api from '../constants/Api';
import {from, of} from 'rxjs';
import axios from 'axios';
import * as RootNavigation from '../navigationRoute';
//yo chae api call garna ko lagi ho hae

/* async function getData() {
  try {
    console.log('hello');
    const res = await axios.get('https://jcess.herokuapp.com/api/user');

    console.log(res, 'from epicSample');

    const data = res.data;

    console.log(data, 'the value of the data from the response');

    return data;
  } catch (e) {
    console.log(e.message, 'Error aayo ferk ');
    throw e;
  }
} */
const myApi = new Api();
export const epicSample = action =>
  action.pipe(
    ofType(DATA_ATTEMPT),
    switchMap(action =>
      from(myApi.getData()).pipe(
        mergeMap(response => {
          RootNavigation.navigate('tabRoute', {header: 'header'});
          console.log(action.payload, 'payload');
          action.payload.myUIChange();
          return of({
            type: DATA_SUCCESS,
            payload: response,
          });
        }),
        catchError(err => {
          return of({
            type: DATA_FAILURE,
            payload: err,
          });
        }),
      ),
    ),
  );

export const epicPost = action =>
  action.pipe(
    ofType(POST_ATTEMPT),
    switchMap(action =>
      from(myApi.postData(action.payload)).pipe(
        mergeMap(response => {
          console.log('response', response);
          return of({
            type: POST_SUCCESS,
            payload: response.data,
          });
        }),
        catchError(err => {
          return of({
            type: POST_FAILURE,
            payload: err,
          });
        }),
      ),
    ),
  );
