import * as R from 'ramda';
import * as imm from 'immutable';
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
        // ...model,
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
      return imm.fromJS(model)
        .setIn(['presentation', 'showForm'], showForm)
        .setIn(['presentation', 'mealDetailData'], mealResetData).toJS();
    }

    case MSGS.MEAL_INPUT: {
      return imm.fromJS(model).setIn(['presentation', 'mealDetailData', 'description'], msg.description).toJS();
    }

    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0),
      )(msg.calories);
      
      return imm.fromJS(model).
        setIn(['presentation', 'mealDetailData', 'calories'], calories).toJS();
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
          return imm.fromJS(model)
            .setIn(['presentation', 'mealDetailData', 'id'], id)
            .setIn(['presentation', 'mealDetailData', 'description'], R.prop('description', meal))
            .setIn(['presentation', 'mealDetailData', 'calories'], R.prop('calories', meal))
            .setIn(['presentation', 'showForm'], true)
            .toJS();
        }
      )(model);
    }
  }
  return model;
}

function edit(msg, model) {
  const { description, calories, id } = model.presentation.mealDetailData;
  return imm.fromJS(model)
    .setIn(['presentation', 'meals'], R.map(
      R.when(
        R.propEq('id', id),
        meal => ({ ...meal, description, calories })
      ),
      presentation.meals
    ))
    .setIn(['presentation', 'mealDetailData'], mealResetData)
    .setIn(['presentation', 'showForm'], false)
    .toJS();
}
