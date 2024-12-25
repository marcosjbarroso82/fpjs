
const CORE_MSGS = {
  ADD_MEAL: 'ADD_MEAL',
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
  }
}

export { updateCore, CORE_MSGS };
