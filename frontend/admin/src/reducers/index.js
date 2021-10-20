import { combineReducers } from 'redux';
import app from './products';
import auth from './auth';

export default combineReducers({ app, auth });