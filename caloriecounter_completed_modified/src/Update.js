import * as R from 'ramda';


const MSGS = {
  INIT: 'INIT',
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description,
  };
}

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories,
  };
}

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id,
  };
}

export function editMealMsg(editId) {
  return {
    type: MSGS.EDIT_MEAL,
    editId,
  };
}

const CORE_MSGS = {
  ADD_MEAL: 'ADD_MEAL',
}

function updateCoreModel(msg, model) {
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



export function updatePresentationModel(msg, model) {
  console.log('updatePresentationModel', msg, model);
  switch (msg.type) {
    case MSGS.INIT: {
      console.log('INIT');
      const { core, presentation } = msg.payload;
      return {
        ...model,
        core: {
          ...core
        },
        presentation: {
          ...presentation,
          meals: core.meals
        }
      };
    }
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { 
        ...model,
        presentation: { 
          ...model.presentation,
          showForm, 
          description: '', 
          calories: 0,
          editId: null
        }
      };
    }
    case MSGS.MEAL_INPUT: {
      const { description } = msg;
      return { 
        ...model,
        presentation: { 
          ...model.presentation,
          description 
        }
      };
    }
    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt, 
        R.defaultTo(0),
      )(msg.calories);
      return { 
        ...model,
        presentation: { 
          ...model.presentation,
          calories 
        }
      };
    }
    case MSGS.SAVE_MEAL: {
      const { editId } = model.presentation;
      const updatedModel = editId !== null ? 
        edit(msg, model) : 
        UpdatePresentationAddMeal(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_MEAL: {
      const { id } = msg;
      const meals = R.filter(
        meal => meal.id !== id
      , model.presentation.meals);
      return { 
        ...model,
        presentation: { 
          ...model.presentation,
          meals 
        }
      };
    }
    case MSGS.EDIT_MEAL: {
      const { editId } = msg;
      const meal = R.find(
        meal => meal.id === editId, 
        model.presentation.meals);
      
      const { description, calories } = meal;

      return {
        ...model, 
        presentation: { 
          ...model.presentation,
          editId, 
          description, 
          calories,
          showForm: true, 
        }
      };
    }
  }
  return model;
}

function UpdatePresentationAddMeal(msg, model) {
  const { description, calories } = model.presentation;
  const meal = { description, calories };

  const coreModel = updateCoreModel(
    {
      type: CORE_MSGS.ADD_MEAL,
      payload: {
        meal      
      }
    }, 
    model.core
  );

  const updatedModel = updatePresentationModel(
    {
      type: MSGS.INIT,
      payload: {
        core: coreModel,
        presentation: {
          // ...model.presentation,
          editId: null,
          description: '',  
          calories: 0,
          showForm: false
        }
      }
    }
  )

  return updatedModel;

}

function edit(msg, model) {
  const { description, calories, editId } = model.presentation;
  const meals = R.map(meal => {
    if (meal.id === editId) {
      return { 
        ...meal,
        description,
        calories
      };
    }
    return meal;
  }, model.presentation.meals);
  return {
    ...model,
    presentation: {
      ...model.presentation,
      meals,
      description: '',
      calories: 0,
      showForm: false,
      editId: null,
    }
  };
}
