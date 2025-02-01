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
import { ACCUMULATOR_VALUE_DATA_PATH_SEGMENTS, COMPONENT_ACCUMULATOR_INCREMENT_BY_DATA_PATH_SEGMENTS, COMPONENT_ACCUMULATOR_PATH } from "./constantsAccumulator";

const accumulatorViewStateUpdate = (appState) => {

    const globalAccumulator = path(ACCUMULATOR_VALUE_DATA_PATH_SEGMENTS, appState);
    const accumulator = path(COMPONENT_ACCUMULATOR_PATH.split('.'), appState);
    const accumulatorIncrementBy = path(COMPONENT_ACCUMULATOR_INCREMENT_BY_DATA_PATH_SEGMENTS, appState);

    return update(appState, {
        [APP_OUTPUT_PATH]: [$assign, {
            globalAccumulator,
            accumulator, 
            accumulatorIncrementBy
        }]

    });

}

export { accumulatorViewStateUpdate };


