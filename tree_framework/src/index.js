import './style.css';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import hh from 'hyperscript-helpers';

const { div, h1, table, tr, td, th, button, input, pre } = hh(h);

const initialData = {
    stock: {
        items: [
            {id: 1, name: 'Apple', price: 100, quantity: 100},
            {id: 2, name: 'Orange', price: 100, quantity: 100},
            {id: 3, name: 'Banana', price: 100, quantity: 100},
        ],
        nextId: 4
    }
}

function update(msg, model) {
    return model
}

function view(dispatch, model) {
    return div({}, [
        h1('Test'),
        pre(JSON.stringify(model, null, 2))
    ])
}

function app(initialData, node) {
    let model = initialData;
    model = update('INIT', model);
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

  function dispatch(msg) {
    console.log('dispatch', msg);
    data = update(msg, data);
    const updatedView = view(dispatch, data);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  } 
}

const node = document.getElementById('app');


app(initialData, node);