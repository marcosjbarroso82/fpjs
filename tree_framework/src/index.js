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
import { EXECUTE_NEXT_MSG } from './constants';
import { view } from './main_app/render';
import { pipeExecuter } from './pipeExecuter';
import { MODEL_PIPE, VIEW_PIPE, CONTROLLER_PIPE } from './main_app/pipes';

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
          "accumulator": 7,
          "counter": 5,
          "independentCounter": 55
        },
        "appInternalState": {
          "accumulatorComponent": {
            "accumulator": 7,
            "incrementBy": 1
          },
          "counterComponent": {
            "incrementBy": 2
          },


          "anotherCounterComponent": {
            "incrementBy": 3
          },
          "independentCounterComponent": {
            "incrementBy": 11
          }
        },
        "output": {
          "accumulator": 7,
          "accumulatorIncrementBy": 1,
          "counter": 5,
          "incrementBy": 2,
          "anotherIncrementBy": 3,
          "counterViewStateUpdateDebugTimeStamp": "2025-01-28T15:45:39.717Z",
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

        appState = pipeExecuter(MAIN_PIPE, appState);
        
        const updatedView = view(dispatch, appState);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const node = document.getElementById('app');


app(node);