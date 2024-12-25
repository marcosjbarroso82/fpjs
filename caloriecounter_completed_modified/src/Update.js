import * as R from 'ramda';
import { updateIn } from 'immutable';
import { MSGS } from './UpdateMsgs';
import { UpdatePresentationAddMeal, UpdatePresentationEditMeal, UpdatePresentationDeleteMeal} from './UpdateHelpers';
import { mealResetData } from './Model';


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
      return R.pipe(
        model => updateIn(model, ['presentation', 'showForm'], () => showForm),
          model => updateIn(model, ['presentation', 'mealDetailData'], () => mealResetData)
      )(model);
    }

    case MSGS.MEAL_INPUT: {
      return updateIn(model, ['presentation', 'mealDetailData', 'description'], () => msg.description);
    }

    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0),
      )(msg.calories);
      
      return updateIn(model, ['presentation', 'mealDetailData', 'calories'], () => calories);
    }

    case MSGS.SAVE_MEAL: {
      const { id } = model.presentation.mealDetailData;
      const updatedModel = id !== null ? 
        UpdatePresentationEditMeal(msg, model) : 
        UpdatePresentationAddMeal(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_MEAL: {
      return UpdatePresentationDeleteMeal(msg, model);
    }
    case MSGS.EDIT_MEAL: {
      const { id } = msg;
      return R.pipe(
        model => {
          const meal = R.find(R.propEq('id', id), model.presentation.meals);
          return updateIn(model, ['presentation'], presentation => ({
            ...presentation,
            mealDetailData: {
              id,
              description: R.prop('description', meal),
              calories: R.prop('calories', meal)
            },
            showForm: true
          }));
        }
      )(model);
    }
  }
  return model;
}

function edit(msg, model) {
  const { description, calories, id } = model.presentation.mealDetailData;
  return updateIn(model, ['presentation'], presentation => ({
    ...presentation,
    meals: R.map(
      R.when(
        R.propEq('id', id),
        meal => ({ ...meal, description, calories })
      ),
      presentation.meals
    ),
    mealDetailData: mealResetData,
    showForm: false
  }));
}
