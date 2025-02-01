import { update, $set } from "immhelper";
import { path } from 'ramda';
import { 
    ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, 
    ACCUMULATOR_MODEL_INCREMENT, 
    ACCUMULATOR_CONTROLLER_INCREMENT, 
    ACCUMULATOR_CONTROLLER_DUMP 
} from './constantsAccumulator';
import { APP_STATE_PATH } from '../constants';

const CORE_MSGS = {
    SET_INCREMENT_BY: 'SET_INCREMENT_BY',
    INCREMENT: 'INCREMENT',
    DUMP: 'DUMP'
}

const CORE_RETURN_MSGS = {
    CONTEXT_SET_ACCUMULATOR: 'CONTEXT_SET_ACCUMULATOR',
}


const coreAccumulatorController = (ctrlState, msg) => {
    if (!msg?.type) return { newCtrlState: ctrlState, returnMsg: null };

    const { incrementBy, accumulator } = ctrlState;
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
                accumulator: accumulator + incrementBy
            }
            break;

        case CORE_MSGS.DUMP:
            returnMsg = {
                type: CORE_RETURN_MSGS.CONTEXT_SET_ACCUMULATOR,    
                payload: accumulator
            }
            newCtrlState = {
                ...newCtrlState,
                accumulator: 0
            }
            break;
    }

    return {
        newCtrlState,
        returnMsg
    };
}

const CONTROLLER_STATE_PATH = `${APP_STATE_PATH}.accumulatorComponent`;


export const accumulatorControllerStateUpdate = (appState) => {
    if (!appState?.msg) return appState;

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
    if (returnMsg?.type === CORE_RETURN_MSGS.CONTEXT_SET_ACCUMULATOR) {
        updateObj.nextMsg = [$set, {
            type: ACCUMULATOR_MODEL_INCREMENT,
            payload: returnMsg.payload
        }];
    }

    return update(appState, updateObj);
}
