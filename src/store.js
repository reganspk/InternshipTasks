import {createStore, applyMiddleware, combineReducers} from 'redux';
import {sampleReducer, postReducer} from './reducers/sampleReducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from './epics/rootEpic';

const epicMiddleWare = createEpicMiddleware();
const initialState = {};
const persistConfig = {
  key: 'root',
  storage,
};
const reducer = combineReducers({
  sampleReducer,
  postReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(logger, epicMiddleWare),
);
epicMiddleWare.run(rootEpic);
const persistor = persistStore(store);

export {store, persistor};
