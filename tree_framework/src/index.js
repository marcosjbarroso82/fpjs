import './style.css';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import hh from 'hyperscript-helpers';

const { div, h1, table, tr, td, th } = hh(h);

function update(msg, model) {
  return model;
}

function view(model) {
  const todoRows = model.todos.map(todo => {
    return tr({}, [
      td({}, [
        todo.text
      ])
    ])
  })

  const todoTable = table({}, [
    todoRows
  ])
  return todoTable;
}

function app(initialData, node) {
  let model = update('INIT', initialData);
  let content = view(model);
  let rootNode = createElement(content);
  node.appendChild(rootNode);
  console.log(rootNode);
}

const node = document.getElementById('app');

const initialData = {
  todos: [
    {
      id: 1,
      text: 'Learn React',
      completed: false
    },
    {
      id: 2,
      text: 'Learn Redux',
      completed: false
    }
  ],
  nextTodoId: 3
}

app(initialData, node);