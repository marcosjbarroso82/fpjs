import { update, $set } from "immhelper";
import { 
    ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, 
    ACCUMULATOR_MODEL_INCREMENT, 
    ACCUMULATOR_CONTROLLER_INCREMENT, 
    ACCUMULATOR_CONTROLLER_DUMP 
} from './constantsAccumulator';

const PATH = {
    INCREMENT_BY: 'model.appInternalState.accumulatorComponent.incrementBy',
    ACCUMULATOR: 'model.appInternalState.accumulatorComponent.accumulator'
};

export const accumulatorControllerStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch (appState.msg.type) {
        case ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY:
            return update(appState, {
                [PATH.INCREMENT_BY]: [$set, parseInt(appState.msg.payload)],
                executed: [$set, true],
                nextMsg: [$set, null]
            });

        case ACCUMULATOR_CONTROLLER_INCREMENT:
            const newAccumulator = appState.model.appInternalState.accumulatorComponent.accumulator + 
                                 appState.model.appInternalState.accumulatorComponent.incrementBy;
            return update(appState, {
                [PATH.ACCUMULATOR]: [$set, newAccumulator],
                executed: [$set, true],
                nextMsg: [$set, null]
            });

        case ACCUMULATOR_CONTROLLER_DUMP:
            const currentAccumulator = appState.model.appInternalState.accumulatorComponent.accumulator;
            return update(appState, {
                [PATH.ACCUMULATOR]: [$set, 0],
                executed: [$set, true],
                nextMsg: [$set, {
                    type: ACCUMULATOR_MODEL_INCREMENT,
                    payload: currentAccumulator
                }]
            });

        default:
            return appState;    
    }
}
