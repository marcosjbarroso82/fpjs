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
import { APP_OUTPUT_PATH, APP_DATA_PATH, APP_STATE_PATH } from '../constants';
import { path } from 'ramda';

const COMPONENT_STATE_PATH = APP_STATE_PATH + '.accumulatorComponent';

const accumulatorViewStateUpdate = (appState) => {
    const GLOBAL_ACCUMULATOR_PATH = APP_DATA_PATH + '.accumulator';
    const COMPONENT_ACCUMULATOR_PATH = COMPONENT_STATE_PATH + '.accumulator';
    const COMPONENT_ACCUMULATOR_INCREMENT_BY_PATH = COMPONENT_STATE_PATH + '.incrementBy';

    return update(appState, {
        [APP_OUTPUT_PATH]: [$assign, {
            globalAccumulator: path(GLOBAL_ACCUMULATOR_PATH.split('.'), appState),
            accumulator: path(COMPONENT_ACCUMULATOR_PATH.split('.'), appState), 
            accumulatorIncrementBy: path(COMPONENT_ACCUMULATOR_INCREMENT_BY_PATH.split('.'), appState)
        }]
    });
}

export { accumulatorViewStateUpdate };


