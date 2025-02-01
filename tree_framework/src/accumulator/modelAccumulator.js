import { update, $set } from 'immhelper';
import { ACCUMULATOR_MODEL_INCREMENT } from './constantsAccumulator';
import { APP_DATA_PATH } from '../constants';

const STATE_PATH = {
    ACCUMULATOR: `${APP_DATA_PATH}.accumulator`
};

export const accumulatorModelStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case ACCUMULATOR_MODEL_INCREMENT:
            return update(appState, {
                [STATE_PATH.ACCUMULATOR]: [x => x + appState.msg.payload],
                executed: [$set, true],
                nextMsg: [$set, null]
            });
            
        default:
            return appState;
    }
}

