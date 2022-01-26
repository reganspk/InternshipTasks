import {combineEpics} from 'redux-observable';
import {epicPost, epicSample} from './epicSample';

export const rootEpic = combineEpics(epicSample, epicPost);
