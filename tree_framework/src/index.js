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


const INIT_MSG = 'INIT_MSG';



const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);


const COUNTER_CTRL_SET_INCREMENT_BY = 'COUNTER_CTRL_SET_INCREMENT_BY';
const COUNTER_CTRL_INCREMENT = 'COUNTER_CTRL_INCREMENT';
const COUNTER_MODEL_INCREMENT = 'COUNTER_MODEL_INCREMENT';

const counterControllerStateUpdate = (appState) => {
    console.log('counterStateUpdate', appState);

    switch(appState.msg.type) {
        case COUNTER_CTRL_SET_INCREMENT_BY:
            const incrementBy = parseInt(appState.msg.payload);
            
            let result = update(appState, {
                'nextMsg': [$set, null],
                'executed': [$set, true],
                'model.appInternalState.counterComponent.incrementBy': [$set, incrementBy],

            });

            return result;
        case COUNTER_CTRL_INCREMENT:
            const incrementByValue = appState.model.appInternalState.counterComponent.incrementBy;
            const counterValue = appState.model.data.counter;
            const newCounterValue = counterValue + incrementByValue;
            return update(appState, {
                // 'model.data.counter': [$set, newCounterValue],
                'nextMsg': [$set, {
                    type: COUNTER_MODEL_INCREMENT,
                    payload: newCounterValue
                }],
                'executed': [$set, true],
            });
        default:
            return appState
    }
}

const counterViewStateUpdate = (appState) => {
    console.log('counterViewStateUpdate', appState);

    let newAppState = {
        ...appState,
        model: {
            ...appState.model,
            output: {
                ...appState.model.output,
                counter: appState.model.data.counter,
                incrementBy: appState.model.appInternalState.counterComponent.incrementBy,
                counterViewStateUpdateDebugTimeStamp: new Date().toISOString()
            }
        }
    }

    return newAppState
}

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

const EXECUTE_NEXT_MSG = 'EXECUTE_NEXT_MSG';



const controllerPipe = [
    counterControllerStateUpdate,
]


function controllerPipeExecuter(controllerPipe, appState) {
   
    let newAppState = controllerPipe.reduce((acc, update) => {
        if (!acc.msg || acc.executed)  {
            return acc
        }
        return update(acc);
    }, appState);


    return newAppState
}

// View



const viewPipe = [
    counterViewStateUpdate
]

function viewPipeExecuter(viewPipe, appState) {
    let newAppState = viewPipe.reduce((acc, update) => {
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
                'msg': [$set, null],
                'nextMsg': [$set, null],
                'executed': [$set, true],
            });
        default:
            return appState
    }
}

const modelPipe = [
    counterModelStateUpdate
]

function modelPipeExecuter(modelPipe, appState) {
    let newAppState = modelPipe.reduce((acc, update) => {
        return update(acc);
    }, appState);
    return newAppState
}

// Debug

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

const appPipe = [
    appStateUpdate
]

function appPipeExecuter(debugPipe, appState) {
    let newAppState = debugPipe.reduce((acc, update) => {
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
 
    appState = appPipeExecuter(appPipe, appState);
    appState = modelPipeExecuter(modelPipe, appState);
    appState = controllerPipeExecuter(controllerPipe, appState);
    appState = viewPipeExecuter(viewPipe, appState);
    
    let currentView = view(dispatch, appState);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        console.log('dispatch', msg);
        
        appState.msg = msg;
        appState.executed = false;

        appState = appPipeExecuter(appPipe, appState);
        appState = modelPipeExecuter(modelPipe, appState);
        appState = controllerPipeExecuter(controllerPipe, appState);
        appState = viewPipeExecuter(viewPipe, appState);
        const updatedView = view(dispatch, appState);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const node = document.getElementById('app');


app(node);