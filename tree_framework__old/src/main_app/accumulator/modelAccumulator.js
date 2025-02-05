import { update, $set } from 'immhelper';
import { ACC_MODEL_INC_MSG, ACC_VALUE_DATA_PATH } from './constantsAccumulator';

export const accumulatorModelStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case ACC_MODEL_INC_MSG:

            return update(appState, {
                [ACC_VALUE_DATA_PATH]: [x => x + appState.msg.payload],
                executed: [$set, true],
                nextMsg: [$set, null]
            });
            
        default:
            return appState;
    }
}

