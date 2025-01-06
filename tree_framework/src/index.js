import './style.css';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import hh from 'hyperscript-helpers';



const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);

const initialData = {
    data: {
        counter: 0,
    },
    appInternalState: {
        counterComponent: {
            incrementBy: 2
        }
    },
    output: {}
}
const COUNTER_CONTROLLER_INCREMENT_BY = 'COUNTER_CONTROLLER_INCREMENT_BY';

const counterControllerStateUpdate = (executionParams) => {
    console.log('counterStateUpdate', executionParams);
    if (executionParams.msg === null || executionParams.executed)  {
        return executionParams
    }
    switch(executionParams.msg.type) {
        case COUNTER_CONTROLLER_INCREMENT_BY:

            return {
                model: {    
                    ...executionParams.model,
                    appInternalState: {
                        ...executionParams.model.appInternalState,
                        counterComponent: {
                            ...executionParams.model.appInternalState.counterComponent,
                            incrementBy: executionParams.msg.payload,
                        }
                    },
                    output: {
                        ...executionParams.model.output
                    }
                },
                nextMsg: null,
                executed: true
            }
        default:
            return executionParams
    }
}

const counterViewStateUpdate = (executionParams) => {
    console.log('counterOutput', executionParams);
    return {
        ...executionParams.model,
        output: {
            ...executionParams.model.output,
            counter: executionParams.model.data.counter,
            incrementBy: executionParams.model.appInternalState.counterComponent.incrementBy
        }
    }
}



const updatePipe = [
    counterControllerStateUpdate,
    counterViewStateUpdate

]

function updatePipeExecuter(msg, updatePipe, model) {
    const executionParams = {
        model: model,
        msg: msg,
        nextMsg: null,
        executed: false
    }
    const newModel = updatePipe.reduce((acc, update) => {
        return update(acc);
    }, executionParams);

    return newModel
}

function renderCounterForm(dispatch, model) {
    return div({}, [
        label({}, 'Counter: '),
        label({}, model.output.counter),
        br(),
        label({}, 'Increment By: '),
        label({}, model.output.incrementBy),
        input({
            type: 'number', 
            value: model.output.incrementBy, 
            oninput: (e) => dispatch({type: COUNTER_CONTROLLER_INCREMENT_BY, payload: e.target.value})
        }, 'Increment By: '),
        button({onclick: () => dispatch({type: 'INCREMENT'})}, 'Increment' ),
    ])
}

function view(dispatch,model) {
    return div({}, [
        renderCounterForm(dispatch, model),

        h2('Model'),
        pre(JSON.stringify(model, null, 2)),
        h2('Message Dispatcher'),
        p('To be implemented')
    ]);
}




function app(initialData, node) {
    let model = initialData
 
    model = updatePipeExecuter(null, updatePipe, model);
    
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        console.log('dispatch', msg);
        model = updatePipeExecuter(msg, updatePipe, model);
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }


}

const node = document.getElementById('app');


app(initialData, node);