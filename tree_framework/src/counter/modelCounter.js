import { COUNTER_MODEL_INCREMENT } from './constantsCounter';

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

export const counterModelStateUpdate = (appState) => {
    console.log('counterModelStateUpdate', appState);
    if (!appState.msg) return appState;
    
    switch(appState.msg.type) {
        case COUNTER_MODEL_INCREMENT:
            const newValue = appState.model.data.counter + appState.msg.payload;
            return update(appState, {
                'model.data.counter': [$set, newValue],
                msg: [$set, null],
                nextMsg: [$set, null],
                executed: [$set, true]
            });
        default:
            return appState;
    }
}