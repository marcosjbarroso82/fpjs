import {
    update,
    $push,
    $unshift,
    $splice,
    $assign,
    $toggle,
    $unset,
    $set,
    $remove,
    $filter
  } from "immhelper";   

const accumulatorViewStateUpdate = (appState) => {
    return update(appState, {
        'model.output': [$assign, {
            globalAccumulator: appState.model.data.accumulator,
            accumulator: appState.model.appInternalState.accumulatorComponent.accumulator,
            accumulatorIncrementBy: appState.model.appInternalState.accumulatorComponent.incrementBy
        }]
    });
}

export { accumulatorViewStateUpdate };


