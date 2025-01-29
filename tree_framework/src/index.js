import './style.css';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
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
import { COUNTER_CTRL_INCREMENT, COUNTER_CTRL_SET_INCREMENT_BY, COUNTER_MODEL_INCREMENT, ANOTHER_COUNTER_CTRL_INCREMENT, ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY, EXECUTE_NEXT_MSG } from './constants';
import { view } from './view';


function pipeExecuter(pipe, appState) {
    return pipe.reduce((acc, update) => {
        // If the update is an array, recursively process it as a nested pipe
        if (Array.isArray(update)) {
            return pipeExecuter(update, acc);
        }
        // Otherwise, execute the update function normally
        return update(acc);
    }, appState);
}

const counterControllerStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case COUNTER_CTRL_SET_INCREMENT_BY:
            return update(appState, {
                nextMsg: [$set, null],
                executed: [$set, true],
                'model.appInternalState.counterComponent.incrementBy': [$set, parseInt(appState.msg.payload)]
            });

        case COUNTER_CTRL_INCREMENT:
            const newValue = appState.model.data.counter + appState.model.appInternalState.counterComponent.incrementBy;
            return update(appState, {
                nextMsg: [$set, {
                    type: COUNTER_MODEL_INCREMENT,
                    payload: newValue
                }],
                executed: [$set, true]
            });
            
        default:
            return appState;
    }
}


const anotherCounterControllerStateUpdate = (appState) => {
    if (!appState.msg) return appState;

    switch(appState.msg.type) {
        case ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY:
            return update(appState, {
                nextMsg: [$set, null],
                executed: [$set, true],
                'model.appInternalState.anotherCounterComponent.incrementBy': [$set, parseInt(appState.msg.payload)]
            });

        case ANOTHER_COUNTER_CTRL_INCREMENT:
            const newValue = appState.model.data.counter + appState.model.appInternalState.anotherCounterComponent.incrementBy;
            return update(appState, {
                nextMsg: [$set, {
                    type: COUNTER_MODEL_INCREMENT,
                    payload: newValue
                }],
                executed: [$set, true]
            });
            
        default:
            return appState;
    }
}




const counterViewStateUpdate = (appState) => {
    
    return update(appState, {
        'model.output': [$assign, {
            counter: appState.model.data.counter,
            incrementBy: appState.model.appInternalState.counterComponent.incrementBy,
            counterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}


const anotherCounterViewStateUpdate = (appState) => {
    
    return update(appState, {
        'model.output': [$assign, {
            counter: appState.model.data.counter,
            anotherIncrementBy: appState.model.appInternalState.anotherCounterComponent.incrementBy,
            anotherCounterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}

const CONTROLLER_PIPE = [
    counterControllerStateUpdate,
    anotherCounterControllerStateUpdate
]


// View
const VIEW_PIPE = [
    counterViewStateUpdate,
    anotherCounterViewStateUpdate
]

// Model

const counterModelStateUpdate = (appState) => {
    console.log('counterModelStateUpdate', appState);
    if (!appState.msg) return appState;
    
    switch(appState.msg.type) {    
        case COUNTER_MODEL_INCREMENT:
            return update(appState, {
                'model.data.counter': [$set, appState.msg.payload],
                msg: [$set, null],
                nextMsg: [$set, null],
                executed: [$set, true]
            });
        default:
            return appState;
    }
}

const MODEL_PIPE = [
    counterModelStateUpdate
]

// App

const appStateUpdate = (appState) => {
    console.log('appStateUpdate', appState);
    if (!appState.msg) return appState;
    
    switch(appState.msg.type) {
        case EXECUTE_NEXT_MSG:
            let nextMsg = appState.nextMsg;     
            return update(appState, {
                'executed': [$set, false],
                'nextMsg': [$set, null],
                'msg': [$set, nextMsg]
            });
        default:
            return appState
    }
}

const APP_PIPE = [
    appStateUpdate
]

// Now we can combine all pipes into a single nested structure
const MAIN_PIPE = [
    APP_PIPE,
    MODEL_PIPE,
    CONTROLLER_PIPE,
    VIEW_PIPE
];

function app(node) {

    let appState = 
    {
      "model": {
        "debug_msg": "initialData",
        "data": {
          "counter": 5
        },
        "appInternalState": {
          "counterComponent": {
            "incrementBy": 2
          },
          "anotherCounterComponent": {
            "incrementBy": 3
          }
        },
        "output": {
          "counter": 5,
          "incrementBy": 2,
          "anotherIncrementBy": 3,
          "counterViewStateUpdateDebugTimeStamp": "2025-01-28T15:45:39.717Z"
        }
      },
      "msg": {},
      "nextMsg": {
        "type": "COUNTER_MODEL_INCREMENT",
        "payload": 7
      },
      "executed": true
    }
 
    // Initial execution
    appState = pipeExecuter(MAIN_PIPE, appState);
    
    let currentView = view(dispatch, appState);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        console.log('dispatch', msg);
        
        appState.msg = msg;
        appState.executed = false;

        // Replace multiple pipeExecuter calls with a single call
        appState = pipeExecuter(MAIN_PIPE, appState);
        
        const updatedView = view(dispatch, appState);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const node = document.getElementById('app');


app(node);