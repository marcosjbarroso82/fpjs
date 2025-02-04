import {
    update,
    $set,
} from "immhelper";
import { path } from 'ramda';

import {
    COUNTER_CTRL_INCREMENT,
    COUNTER_CTRL_SET_INCREMENT_BY,
    COUNTER_MODEL_INCREMENT,
    ANOTHER_COUNTER_CTRL_INCREMENT,
    ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY,
    INDEPENDENT_COUNTER_CTRL_SET_INCREMENT_BY,
    INDEPENDENT_COUNTER_CTRL_INCREMENT,
    INDEPENDENT_COUNTER_MODEL_INCREMENT,
    COUNTER_CTRL_STATE_PATH_SEGMENTS,
    ANOTHER_COUNTER_CTRL_STATE_PATH_SEGMENTS,
    INDEPENDENT_COUNTER_CTRL_STATE_PATH_SEGMENTS    

} from './constantsCounter';

const createController = (handler, statePathSegments) => {
    return (appState) => {
        if (!appState.msg) return appState;

        const internalState = path(statePathSegments, appState);

        // Get new state and next msg
        const result = handler(internalState, appState.msg);

        if (!result) return appState;

        // Update app state
        const updates = {
            executed: [$set, true],
            nextMsg: [$set, result.nextMsg]
        };


        if (result.internalStateUpdate) {
            updates[statePath] = [$set, {
                ...internalState,
                ...result.internalStateUpdate
            }];
        }

        return update(appState, updates);
    };
};

const handleCounter = (setIncrementByAction, incrementAction, modelIncrementAction) => (internalState, action) => {
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
                    type: modelIncrementAction,
                    payload: internalState.incrementBy
                }
            };
            
        default:
            return null;
    }
};

export const counterControllerStateUpdate = createController(
    handleCounter(COUNTER_CTRL_SET_INCREMENT_BY, COUNTER_CTRL_INCREMENT, COUNTER_MODEL_INCREMENT),
    COUNTER_CTRL_STATE_PATH_SEGMENTS
);

export const anotherCounterControllerStateUpdate = createController(
    handleCounter(ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY, ANOTHER_COUNTER_CTRL_INCREMENT, COUNTER_MODEL_INCREMENT),
    ANOTHER_COUNTER_CTRL_STATE_PATH_SEGMENTS
);

export const independentCounterControllerStateUpdate = createController(
    handleCounter(INDEPENDENT_COUNTER_CTRL_SET_INCREMENT_BY, INDEPENDENT_COUNTER_CTRL_INCREMENT, INDEPENDENT_COUNTER_MODEL_INCREMENT),
    INDEPENDENT_COUNTER_CTRL_STATE_PATH_SEGMENTS
);

