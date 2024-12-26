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


const CORE_MSGS = {
  ADD_MEAL: 'ADD_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
}

function updateCore(msg, model) {
  console.log('updateCoreModel', msg, model);

  switch (msg.type) {

    case CORE_MSGS.ADD_MEAL: {
      return update(model, {
        meals: [$push, msg.payload.meal],
        nextId: [[x => x + 1]]
      });
    }

    case CORE_MSGS.EDIT_MEAL: {
      return update(model, {
        meals: [[meal => meal.id === msg.payload.meal.id ? msg.payload.meal : meal]]
      });
    }

    case CORE_MSGS.DELETE_MEAL: {
      return update(model, {
        meals: [$filter, x => x.id !== msg.payload.id]
      });
    }

    default: {
      return model;
    }

  }
}

export { updateCore, CORE_MSGS };
