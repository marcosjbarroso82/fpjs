import { ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, ACCUMULATOR_MODEL_INCREMENT, ACCUMULATOR_CONTROLLER_INCREMENT, ACCUMULATOR_CONTROLLER_DUMP } from './constantsAccumulator';



export const accumulatorControllerStateUpdate = (appState) => {


    if (!appState.msg) return appState;

    switch (appState.msg.type) {
        case ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY:
            return {
                ...appState,
                model: {    
                    ...appState.model,
                    appInternalState: {
                        ...appState.model.appInternalState, 
                        accumulatorComponent: {
                            ...appState.model.appInternalState.accumulatorComponent,
                                incrementBy: parseInt(appState.msg.payload)
                        }
                    }
                },
                executed: true,
                nextMsg: null
            };
        case ACCUMULATOR_CONTROLLER_INCREMENT:

            return {
                ...appState,
                model: {
                    ...appState.model,
                    appInternalState: {
                        ...appState.model.appInternalState,
                        accumulatorComponent: {
                            ...appState.model.appInternalState.accumulatorComponent,
                            accumulator: appState.model.appInternalState.accumulatorComponent.accumulator + appState.model.appInternalState.accumulatorComponent.incrementBy
                        }
                    }
                },

                executed: true,
                nextMsg: null
            };
        case ACCUMULATOR_CONTROLLER_DUMP:
            return {
                ...appState,
                model: {
                    ...appState.model,
                    appInternalState: {
                        ...appState.model.appInternalState,
                        accumulatorComponent: {
                            ...appState.model.appInternalState.accumulatorComponent,
                            accumulator: 0
                        }
                    }
                },
                executed: true,
                nextMsg: {
                    type: ACCUMULATOR_MODEL_INCREMENT,
                    payload: appState.model.appInternalState.accumulatorComponent.accumulator
                }

            };
        default:
            return appState;    
    }

}
