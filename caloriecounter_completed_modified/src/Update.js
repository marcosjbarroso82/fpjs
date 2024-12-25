import * as R from 'ramda';
import { updateIn } from 'immutable';
import { MSGS } from './UpdateMsgs';
import { UpdatePresentationAddMeal } from './UpdateHelpers';


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
      return updateIn(model, ['presentation', 'description'], () => msg.description);
    }
    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt, 
        R.defaultTo(0),
      )(msg.calories);
      
      return updateIn(model, ['presentation', 'calories'], () => calories);
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
