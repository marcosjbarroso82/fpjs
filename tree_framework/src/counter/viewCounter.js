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
    
    return update(appState, {
        'model.output': [$assign, {
            counter: appState.model.data.counter,
            anotherIncrementBy: appState.model.appInternalState.anotherCounterComponent.incrementBy,
            anotherCounterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}