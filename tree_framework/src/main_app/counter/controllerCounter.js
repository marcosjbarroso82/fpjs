import {
    update,
    $set,
} from "immhelper";
import { path } from 'ramda';
import { createController } from '../../framework/createController';
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
                    ...internalState
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

