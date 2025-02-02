import {
    update,
    $push,
    $unshift,
    $splice,
    $assign,
    $toggle,
    $unset,
    $set,
    $remove,
    $filter
  } from "immhelper";
import { APP_OUTPUT_PATH } from '../constants';
import { path } from 'ramda';
import {
    COUNTER_DATA_PATH_SEGMENTS,
    COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS,
    INDEPENDENT_COUNTER_DATA_PATH_SEGMENTS,
    INDEPENDENT_COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS,
    ANOTHER_COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS
} from './constantsCounter';

export const counterViewStateUpdate = (appState) => {
    const counter = path(COUNTER_DATA_PATH_SEGMENTS, appState);
    const incrementBy = path(COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS, appState);
    
    return update(appState, {
        [APP_OUTPUT_PATH]: [$assign, {
            counter,
            incrementBy,
            counterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}

export const anotherCounterViewStateUpdate = (appState) => {
    const counter = path(COUNTER_DATA_PATH_SEGMENTS, appState);
    const anotherIncrementBy = path(ANOTHER_COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS, appState);
    
    return update(appState, {
        [APP_OUTPUT_PATH]: [$assign, {
            counter,
            anotherIncrementBy,
            anotherCounterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}

export const independentCounterViewStateUpdate = (appState) => {
    const independentCounter = path(INDEPENDENT_COUNTER_DATA_PATH_SEGMENTS, appState);
    const independentCounterIncrementBy = path(INDEPENDENT_COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS, appState);
    
    return update(appState, {
        [APP_OUTPUT_PATH]: [$assign, {
            independentCounter,
            independentCounterIncrementBy,
            independentCounterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}