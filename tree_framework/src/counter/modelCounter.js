import { update, $set } from 'immhelper';
import { 
    COUNTER_MODEL_INCREMENT, 
    INDEPENDENT_COUNTER_MODEL_INCREMENT,
    COUNTER_DATA_PATH,
    INDEPENDENT_COUNTER_DATA_PATH
} from './constantsCounter';

import {
    $push,
    $unshift,
    $splice,
    $assign,
    $toggle,
    $unset,
    $remove,
    $filter
  } from "immhelper";

export const counterModelStateUpdate = (appState) => {
    console.log('counterModelStateUpdate', appState);
    if (!appState.msg) return appState;
    
    switch(appState.msg.type) {
        case COUNTER_MODEL_INCREMENT:
            return update(appState, {
                [COUNTER_DATA_PATH]: [x => x + appState.msg.payload],
                msg: [$set, null],
                nextMsg: [$set, null],
                executed: [$set, true]
            });
        case INDEPENDENT_COUNTER_MODEL_INCREMENT:
            return update(appState, {
                [INDEPENDENT_COUNTER_DATA_PATH]: [x => x + appState.msg.payload],
                msg: [$set, null],
                nextMsg: [$set, null],
                executed: [$set, true]
            });
        default:
            return appState;
    }
}