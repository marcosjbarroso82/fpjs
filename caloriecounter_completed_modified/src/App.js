import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(initCoreModel, initPresentationModel, update, view, node) {
  let model = update(
    {
      type: 'INIT',
      payload: {
        core: initCoreModel,
        presentation: {
          ...initPresentationModel,
          meals: initCoreModel.meals,
          // TODO: remove this once core layer is implemented
          nextId: initCoreModel.nextId
        }
      }
    }, 
    {}
  );
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg){
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export { app };