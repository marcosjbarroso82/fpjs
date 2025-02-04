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
import { APP_OUTPUT_PATH } from '../../framework/constants';
import { path } from 'ramda';
import { ACC_VALUE_DATA_PATH_SEGMENTS, ACC_CTRL_ACC_INC_BY_DATA_PATH_SEGMENTS, ACC_CTRL_ACC_PATH_SEGMENTS } from "./constantsAccumulator";

const accumulatorViewStateUpdate = (appState) => {

    const globalAccumulator = path(ACC_VALUE_DATA_PATH_SEGMENTS, appState);
    const accumulator = path(ACC_CTRL_ACC_PATH_SEGMENTS, appState);
    const accumulatorIncrementBy = path(ACC_CTRL_ACC_INC_BY_DATA_PATH_SEGMENTS, appState);

    return update(appState, {
        [APP_OUTPUT_PATH]: [$assign, {
            globalAccumulator,
            accumulator, 
            accumulatorIncrementBy
        }]

    });

}

export { accumulatorViewStateUpdate };


