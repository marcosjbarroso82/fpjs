import { update, $set } from 'immhelper';
import { ACC_MODEL_INC } from './constantsAccumulator';
import { APP_DATA_PATH } from '../constants';


const STATE_PATH = {
    ACC: `${APP_DATA_PATH}.accumulator`
};


export const accumulatorModelStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case ACC_MODEL_INC:
            return update(appState, {
                [STATE_PATH.ACC]: [x => x + appState.msg.payload],

                executed: [$set, true],
                nextMsg: [$set, null]
            });
            
        default:
            return appState;
    }
}

