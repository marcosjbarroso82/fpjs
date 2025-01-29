import {
    update,
    $set,
  } from "immhelper";

import { COUNTER_CTRL_INCREMENT, COUNTER_CTRL_SET_INCREMENT_BY, COUNTER_MODEL_INCREMENT, ANOTHER_COUNTER_CTRL_INCREMENT, ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY } from './constantsCounter';


export const counterControllerStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case COUNTER_CTRL_SET_INCREMENT_BY:
            return update(appState, {
                nextMsg: [$set, null],
                executed: [$set, true],
                'model.appInternalState.counterComponent.incrementBy': [$set, parseInt(appState.msg.payload)]
            });

        case COUNTER_CTRL_INCREMENT:
            const newValue = appState.model.data.counter + appState.model.appInternalState.counterComponent.incrementBy;
            return update(appState, {
                nextMsg: [$set, {
                    type: COUNTER_MODEL_INCREMENT,
                    payload: newValue
                }],
                executed: [$set, true]
            });
            
        default:
            return appState;
    }
}

export const anotherCounterControllerStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY:
            return update(appState, {
                nextMsg: [$set, null],
                executed: [$set, true],
                'model.appInternalState.anotherCounterComponent.incrementBy': [$set, parseInt(appState.msg.payload)]
            });

        case ANOTHER_COUNTER_CTRL_INCREMENT:
            const newValue = appState.model.data.counter + appState.model.appInternalState.anotherCounterComponent.incrementBy;
            return update(appState, {
                nextMsg: [$set, {
                    type: COUNTER_MODEL_INCREMENT,
                    payload: newValue
                }],
                executed: [$set, true]
            });
            
        default:
            return appState;
    }
}
