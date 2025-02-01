import { update, $set } from "immhelper";
import { path } from 'ramda';
import { 
    ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, 
    ACCUMULATOR_MODEL_INCREMENT, 
    ACCUMULATOR_CONTROLLER_INCREMENT, 
    ACCUMULATOR_CONTROLLER_DUMP 
} from './constantsAccumulator';

const CORE_MSGS = {
    SET_INCREMENT_BY: 'SET_INCREMENT_BY',
    INCREMENT: 'INCREMENT',
    DUMP: 'DUMP'
}

const CORE_RETRUN_MSGS = {
    CONTEXT_SET_ACCUMULATOR: 'CONTEXT_SET_ACCUMULATOR',
}


const coreAccumulatorController = (ctrlState, msg) => {
    if (!msg.type) return ctrlState;

    let newCtrlState = ctrlState;
    let returnMsg = null;

    switch (msg.type) {
        case CORE_MSGS.SET_INCREMENT_BY:
            newCtrlState = {
                ...newCtrlState,
                incrementBy: parseInt(msg.payload)
            }
            break;

        case CORE_MSGS.INCREMENT:
            newCtrlState = {
                ...newCtrlState,
                accumulator: newCtrlState.accumulator + newCtrlState.incrementBy
            }
            break;

        case CORE_MSGS.DUMP:
            const currentAccumulator = newCtrlState.accumulator;
            newCtrlState = {
                ...newCtrlState,
                accumulator: 0
            }
            returnMsg = {
                type: CORE_RETRUN_MSGS.CONTEXT_SET_ACCUMULATOR,    
                payload: currentAccumulator
            }
            break;
    }

    return {
        newCtrlState,
        returnMsg
    };
}

const CONTROLLER_STATE_PATH = 'model.appInternalState.accumulatorComponent';

export const accumulatorControllerStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    // Map app messages to core messages
    let coreMsg = null;
    switch (appState.msg.type) {
        case ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY:
            coreMsg = { type: CORE_MSGS.SET_INCREMENT_BY, payload: appState.msg.payload };
            break;
        case ACCUMULATOR_CONTROLLER_INCREMENT:
            coreMsg = { type: CORE_MSGS.INCREMENT };
            break;
        case ACCUMULATOR_CONTROLLER_DUMP:
            coreMsg = { type: CORE_MSGS.DUMP };
            break;
        default:
            return appState;
    }

    // Get current controller state using path
    const pathSegments = CONTROLLER_STATE_PATH.split('.');
    const currentCtrlState = path(pathSegments, appState);

    // Call core controller
    const { newCtrlState, returnMsg } = coreAccumulatorController(currentCtrlState, coreMsg);

    // Map core controller results back to app state
    let updateObj = {
        [CONTROLLER_STATE_PATH]: [$set, newCtrlState],
        executed: [$set, true],
        nextMsg: [$set, null]
    };

    // Map return message if exists
    if (returnMsg && returnMsg.type === CORE_RETRUN_MSGS.CONTEXT_SET_ACCUMULATOR) {
        updateObj.nextMsg = [$set, {
            type: ACCUMULATOR_MODEL_INCREMENT,
            payload: returnMsg.payload
        }];
    }

    return update(appState, updateObj);
}
