import {
    update,
    $set,
} from "immhelper";
import { path } from 'ramda';

import {
    BASE_COUNTER_CTRL_SET_INCREMENT_BY,
    BASE_COUNTER_CTRL_INCREMENT,
    BASE_COUNTER_MODEL_INCREMENT,
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

const createController = (handler, statePathSegments, { inMapping, outMapping }) => {
    return (appState) => {
        if (!appState.msg || appState.executed) return appState;

        const internalState = path(statePathSegments, appState);
        const statePath = statePathSegments.join('.');

        // Map incoming action to BASE action
        const mappedAction = {
            ...appState.msg,
            type: inMapping[appState.msg.type]
        };

        // Get new state and next msg
        const result = handler(internalState, mappedAction);

        if (!result) return appState;

        // Map outgoing action if it exists
        const nextMsg = result.nextMsg ? {
            ...result.nextMsg,
            type: outMapping[result.nextMsg.type]
        } : null;

        // Update app state
        const updates = {
            executed: [$set, true],
            nextMsg: [$set, nextMsg]
        };

        updates[statePath] = [$set, result.internalStateUpdated];

        return update(appState, updates);
    };
};

const handleCounter = (internalState, action) => {
    switch(action.type) {
        case BASE_COUNTER_CTRL_SET_INCREMENT_BY:
            return {
                internalStateUpdated: {
                    ...internalState,
                    incrementBy: parseInt(action.payload)
                },
                nextMsg: null
            };

        case BASE_COUNTER_CTRL_INCREMENT:
            return {
                internalStateUpdated: {
                    ...internalState,
                    incrementBy: internalState.incrementBy + 1
                },
                nextMsg: {
                    type: BASE_COUNTER_MODEL_INCREMENT,
                    payload: internalState.incrementBy
                }
            };
            
        default:
            return null;
    }
};

export const counterControllerStateUpdate = createController(
    handleCounter,
    COUNTER_CTRL_STATE_PATH_SEGMENTS,
    {
        inMapping: {
            [COUNTER_CTRL_SET_INCREMENT_BY]: BASE_COUNTER_CTRL_SET_INCREMENT_BY,
            [COUNTER_CTRL_INCREMENT]: BASE_COUNTER_CTRL_INCREMENT,
        },
        outMapping: {
            [BASE_COUNTER_MODEL_INCREMENT]: COUNTER_MODEL_INCREMENT
        }
    }
);

export const anotherCounterControllerStateUpdate = createController(
    handleCounter,
    ANOTHER_COUNTER_CTRL_STATE_PATH_SEGMENTS,
    {
        inMapping: {
            [ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY]: BASE_COUNTER_CTRL_SET_INCREMENT_BY,
            [ANOTHER_COUNTER_CTRL_INCREMENT]: BASE_COUNTER_CTRL_INCREMENT,
        },
        outMapping: {
            [BASE_COUNTER_MODEL_INCREMENT]: COUNTER_MODEL_INCREMENT
        }
    }
);

export const independentCounterControllerStateUpdate = createController(
    handleCounter,
    INDEPENDENT_COUNTER_CTRL_STATE_PATH_SEGMENTS,
    {
        inMapping: {
            [INDEPENDENT_COUNTER_CTRL_SET_INCREMENT_BY]: BASE_COUNTER_CTRL_SET_INCREMENT_BY,
            [INDEPENDENT_COUNTER_CTRL_INCREMENT]: BASE_COUNTER_CTRL_INCREMENT,
        },
        outMapping: {
            [BASE_COUNTER_MODEL_INCREMENT]: INDEPENDENT_COUNTER_MODEL_INCREMENT
        }
    }
);

