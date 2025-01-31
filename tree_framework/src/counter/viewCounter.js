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


export const counterViewStateUpdate = (appState) => {
    
    return update(appState, {
        'model.output': [$assign, {
            counter: appState.model.data.counter,
            incrementBy: appState.model.appInternalState.counterComponent.incrementBy,
            counterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}

export 
const anotherCounterViewStateUpdate = (appState) => {
    // TODO WARN: the update function doesn't even create the key if the value is undefined.
    return update(appState, {
        'model.output': [$assign, {
            counter: appState.model.data.counter,
            anotherIncrementBy: appState.model.appInternalState.anotherCounterComponent.incrementBy,
            anotherCounterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}



export 
const independentCounterViewStateUpdate = (appState) => {
    // TODO WARN: the update function doesn't even create the key if the value is undefined.
    return update(appState, {
        'model.output': [$assign, {
            independentCounter: appState.model.data.independentCounter,
            independentCounterIncrementBy: appState.model.appInternalState.independentCounterComponent.incrementBy,
            independentCounterViewStateUpdateDebugTimeStamp: new Date().toISOString(),
        }]
    });
}