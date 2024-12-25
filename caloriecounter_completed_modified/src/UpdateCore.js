
const CORE_MSGS = {
  ADD_MEAL: 'ADD_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
}

function updateCore(msg, model) {
  console.log('updateCoreModel', msg, model);

  switch (msg.type) {
    case CORE_MSGS.ADD_MEAL: {
      const nextId = model.nextId + 1;
      const { meal } = msg.payload;
      const meals = [...model.meals, { ...meal, id: model.nextId }];
      return { 
        ...model, 
        meals,
        nextId
      };
    }

    case CORE_MSGS.EDIT_MEAL: {
      const { meal } = msg.payload;
      const meals = model.meals.map(m => m.id === meal.id ? meal : m);
      return { ...model, meals };
    }

    case CORE_MSGS.DELETE_MEAL: {
      const { id } = msg.payload;
      const meals = model.meals.filter(m => m.id !== id);
      return { ...model, meals };
    }
  }
}

export { updateCore, CORE_MSGS };
