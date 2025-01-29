import {
    update,
    $set,
  } from "immhelper";

import { COUNTER_CTRL_INCREMENT, COUNTER_CTRL_SET_INCREMENT_BY, COUNTER_MODEL_INCREMENT, ANOTHER_COUNTER_CTRL_INCREMENT, ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY } from './constantsCounter';

const createController = (handler, statePath) => {
    return (appState) => {
        if (!appState.msg) return appState;

        const internalState = appState.model.appInternalState[statePath];
        const result = handler(internalState, appState.msg);

        if (!result) return appState;

        const updates = {
            executed: [$set, true],
            nextMsg: [$set, result.nextMsg]
        };

        if (result.internalStateUpdate) {
            updates[`model.appInternalState.${statePath}`] = [$set, {
                ...internalState,
                ...result.internalStateUpdate
            }];
        }

        return update(appState, updates);
    };
};

const handleCounter = (setIncrementByAction, incrementAction) => (internalState, action) => {
    switch(action.type) {
        case setIncrementByAction:
            return {
                internalStateUpdate: {
                    incrementBy: parseInt(action.payload)
                },
                nextMsg: null
            };

        case incrementAction:
            return {
                internalStateUpdate: null,
                nextMsg: {
                    type: COUNTER_MODEL_INCREMENT,
                    payload: internalState.incrementBy
                }
            };
            
        default:
            return null;
    }
};

export const counterControllerStateUpdate = createController(
    handleCounter(COUNTER_CTRL_SET_INCREMENT_BY, COUNTER_CTRL_INCREMENT),
    'counterComponent'
);

export const anotherCounterControllerStateUpdate = createController(
    handleCounter(ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY, ANOTHER_COUNTER_CTRL_INCREMENT),
    'anotherCounterComponent'
);
