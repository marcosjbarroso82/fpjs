import { ACCUMULATOR_MODEL_INCREMENT } from './constantsAccumulator';
export const accumulatorModelStateUpdate = (appState) => {
    console.log('accumulatorModelStateUpdate', appState);
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case ACCUMULATOR_MODEL_INCREMENT:

            return {
                ...appState,
                model: {
                    ...appState.model,
                    data: {
                        ...appState.model.data,
                        accumulator: appState.model.data.accumulator + appState.msg.payload
                    }
                },
                executed: true,
                nextMsg: null

            }   
        default:
            return appState;

    }
}

