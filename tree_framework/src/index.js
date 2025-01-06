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

const counterStateUpdate = (msg, model) => {
    if (msg === null) {
        return model
    }
    switch(msg.type) {
        case 'INCREMENT_BY':
            return {
                ...model,
                appInternalState: {
                    ...model.appInternalState,
                    counterComponent: {
                        ...model.appInternalState.counterComponent,
                        incrementBy: msg.payload
                    }
                }
            }
        default:
            return model
    }
}

const counterOutput = (msg, model) => {
    return {
        ...model,
        output: {
            counter: model.data.counter,
            incrementBy: model.appInternalState.counterComponent.incrementBy
        }
    }
}



const updatePipe = [
    counterStateUpdate,
    counterOutput

]

function updatePipeExecuter(msg, updatePipe, model) {
    const newModel = updatePipe.reduce((acc, update) => {
        return update(msg, acc);
    }, model);

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
            oninput: (e) => dispatch({type: 'INCREMENT_BY', payload: e.target.value})
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