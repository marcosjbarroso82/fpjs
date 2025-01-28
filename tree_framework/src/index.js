import './style.css';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import hh from 'hyperscript-helpers';
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

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);


// Renders

function renderCounterForm(dispatch, appState) {
    return div({}, [
        label({}, 'Counter: '),
        label({}, appState.model.output.counter),
        br(),
        label({}, 'Increment By: '),
        label({}, appState.model.output.incrementBy),
        input({
            type: 'number', 
            value: appState.model.output.incrementBy, 
            oninput: (e) => dispatch({type: COUNTER_CTRL_SET_INCREMENT_BY, payload: e.target.value})
        }, 'Increment By: '),
        button({onclick: () => dispatch({type: COUNTER_CTRL_INCREMENT})}, 'Increment' ),
    ])
}

function renderDebug(dispatch, appState) {
    return div({}, [
        h2('Debug'),
        pre(JSON.stringify(appState.nextMsg, null, 2)),
        button({onclick: () => dispatch({type: EXECUTE_NEXT_MSG})}, 'Execute Next Msg'),
    ])
}


// Constants
const INIT_MSG = 'INIT_MSG';
const COUNTER_CTRL_SET_INCREMENT_BY = 'COUNTER_CTRL_SET_INCREMENT_BY';
const COUNTER_CTRL_INCREMENT = 'COUNTER_CTRL_INCREMENT';
const COUNTER_MODEL_INCREMENT = 'COUNTER_MODEL_INCREMENT';
const EXECUTE_NEXT_MSG = 'EXECUTE_NEXT_MSG';

const counterControllerStateUpdate = (appState) => {

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

const counterViewStateUpdate = (appState) => {
    
    return update(appState, {
        'model.output': [$assign, {
            counter: appState.model.data.counter,
            incrementBy: appState.model.appInternalState.counterComponent.incrementBy,
            counterViewStateUpdateDebugTimeStamp: new Date().toISOString()
        }]
    });
}

const CONTROLLER_PIPE = [
    counterControllerStateUpdate,
]

function controllerPipeExecuter(pipe, appState) {
   
    let newAppState = pipe.reduce((acc, update) => {
        if (!acc.msg || acc.executed)  {
            return acc
        }
        return update(acc);
    }, appState);

    return newAppState
}

// View
const VIEW_PIPE = [
    counterViewStateUpdate
]

function viewPipeExecuter(pipe, appState) {
    let newAppState = pipe.reduce((acc, update) => {
        return update(acc);
    }, appState);
    return newAppState
}

function view(dispatch, appState) {
    return div({}, [
        renderCounterForm(dispatch, appState),
        
        h2('Model'),
        pre(JSON.stringify(appState, null, 2)),
        renderDebug(dispatch, appState),
        h2('Message Dispatcher'),
        p('To be implemented')
    ]);
}

// Model

const counterModelStateUpdate = (appState) => {
    console.log('counterModelStateUpdate', appState);
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

function modelPipeExecuter(pipe, appState) {
    let newAppState = pipe.reduce((acc, update) => {
        return update(acc);
    }, appState);
    return newAppState
}

// App

const appStateUpdate = (appState) => {
    console.log('appStateUpdate', appState);
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

function appPipeExecuter(pipe, appState) {
    let newAppState = pipe.reduce((acc, update) => {
        return update(acc);
    }, appState);
    return newAppState
}



// App
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
          }
        },
        "output": {
          "counter": 5,
          "incrementBy": 2,
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
 
    appState = appPipeExecuter(APP_PIPE, appState);
    appState = modelPipeExecuter(MODEL_PIPE, appState);
    appState = controllerPipeExecuter(CONTROLLER_PIPE, appState);
    appState = viewPipeExecuter(VIEW_PIPE, appState);
    
    let currentView = view(dispatch, appState);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        console.log('dispatch', msg);
        
        appState.msg = msg;
        appState.executed = false;

        appState = appPipeExecuter(APP_PIPE, appState);
        appState = modelPipeExecuter(MODEL_PIPE, appState);
        appState = controllerPipeExecuter(CONTROLLER_PIPE, appState);
        appState = viewPipeExecuter(VIEW_PIPE, appState);
        const updatedView = view(dispatch, appState);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const node = document.getElementById('app');


app(node);