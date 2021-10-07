import { combineReducers } from 'redux';
import app from './products';
import person from './users';
import authit from './auth';

export default combineReducers({ app, authit, person });