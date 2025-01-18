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

const counterControllerStateUpdate = (appState) => {
    console.log('counterStateUpdate', appState);

    switch(appState.msg.type) {
        case COUNTER_CTRL_SET_INCREMENT_BY:
            const incrementBy = appState.msg.payload;
            
            let result = update(appState, {
                'nextMsg': [$set, null],
                'executed': [$set, true],
                // 'model.debug_msg': [$set, 'xxxxxxxxx'],
                'model.appInternalState.counterComponent.incrementBy': [$set, incrementBy],

            });

            return result;
        default:
            return appState
    }
}

const counterViewStateUpdate = (appState) => {
    return {
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
        button({onclick: () => dispatch({type: 'INCREMENT'})}, 'Increment' ),
    ])
}


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
        h2('Message Dispatcher'),
        p('To be implemented')
    ]);
}


function app(node) {



    let appState = {
        model: {
            debug_msg: 'initialData',
            data: {
                counter: 5,
            },
            appInternalState: {
                counterComponent: {
                    incrementBy: 2
                }
            },
            output: {}
        },
        msg: {
            type: INIT_MSG,
            payload: null
        },
        nextMsg: null,
        executed: false
    }
 
    appState = controllerPipeExecuter(controllerPipe, appState);
    
    let currentView = view(dispatch, appState);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        console.log('dispatch', msg);
        appState.msg = msg;
        appState.executed = false;
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