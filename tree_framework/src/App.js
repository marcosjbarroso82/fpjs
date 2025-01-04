import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import hh from 'hyperscript-helpers';
const {
  div,
  h1
} = hh(h);


function app(tree, node) {
  let content = div({}, [
    h1('Hello World')
  ])
  let rootNode = createElement(content);
  node.appendChild(rootNode);
  console.log(rootNode);
}

export { app };