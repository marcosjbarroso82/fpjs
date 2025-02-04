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
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import { pipeExecuter } from './pipeExecuter';

import { EXECUTE_NEXT_MSG } from './constants';

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

export const APP_PIPE = [
  appStateUpdate
]

export function appRunner(node, mainPipe, viewCallable, appState) {
  const pipe = [
    ...APP_PIPE,
    ...mainPipe
  ];

  // Initial execution
  appState = pipeExecuter(pipe, appState);

  let currentView = viewCallable(dispatch, appState);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);

  function dispatch(msg) {
    console.log('dispatch', msg);

    appState.msg = msg;
    appState.executed = false;

    appState = pipeExecuter(pipe, appState);

    const updatedView = viewCallable(dispatch, appState);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}
