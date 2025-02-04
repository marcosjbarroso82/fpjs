import { update, $set } from "immhelper";
import { path } from 'ramda';
import { 
    ACC_CTRL_SET_INC_BY_MSG, 
    ACC_MODEL_INC_MSG, 
    ACC_CTRL_INC_MSG, 
    ACC_CTRL_DUMP_MSG, 
    ACC_CTRL_STATE_PATH,
    ACC_CTRL_STATE_PATH_SEGMENTS

} from './constantsAccumulator';

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

export const accumulatorControllerStateUpdate = (appState) => {
    if (!appState?.msg) return appState;

    // Map app messages to core messages
    let coreMsg = null;
    switch (appState.msg.type) {
        case ACC_CTRL_SET_INC_BY_MSG:
            coreMsg = { type: CORE_MSGS.SET_INCREMENT_BY, payload: appState.msg.payload };
            break;
        case ACC_CTRL_INC_MSG:
            coreMsg = { type: CORE_MSGS.INCREMENT };
            break;
        case ACC_CTRL_DUMP_MSG:

            coreMsg = { type: CORE_MSGS.DUMP };
            break;
        default:
            return appState;
    }

    // Get current controller state using path
    const currentCtrlState = path(ACC_CTRL_STATE_PATH_SEGMENTS, appState);


    // Call core controller
    const { newCtrlState, returnMsg } = coreAccumulatorController(currentCtrlState, coreMsg);

    // Map core controller results back to app state
    let updateObj = {
        [ACC_CTRL_STATE_PATH]: [$set, newCtrlState],
        executed: [$set, true],
        nextMsg: [$set, null]
    };

    // Map return message if exists
    if (returnMsg?.type === CORE_RETURN_MSGS.CONTEXT_SET_ACCUMULATOR) {
        updateObj.nextMsg = [$set, {
            type: ACC_MODEL_INC_MSG,
            payload: returnMsg.payload
        }];
    }

    return update(appState, updateObj);
}
