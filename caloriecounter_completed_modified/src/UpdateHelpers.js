import { updatePresentationModel } from './Update';
import { updateCore, CORE_MSGS } from './UpdateCore';
import { MSGS } from './UpdateMsgs';
import { mealResetData } from './Model';

export function UpdatePresentationAddMeal(msg, model) {
  const { description, calories, id } = model.presentation.mealDetailData;
  const meal = { description, calories, id };

  const coreModel = updateCore(
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
          mealDetailData: mealResetData,
          showForm: false
        }
      }
    }
  );

  return updatedModel;
}

export function UpdatePresentationEditMeal(msg, model) {
  const { description, calories, id } = model.presentation.mealDetailData;
  const meal = { description, calories, id };
  const coreModel = updateCore(
    {
      type: CORE_MSGS.EDIT_MEAL,
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
          mealDetailData: mealResetData,
          showForm: false
        }
      }
    }
  );

  return updatedModel;
}

export function UpdatePresentationDeleteMeal(msg, model) {
  const { id } = msg;
  const coreModel = updateCore(
    { type: CORE_MSGS.DELETE_MEAL, payload: { id } }, 
    model.core
  );

  const updatedModel = updatePresentationModel(
    { 
      type: MSGS.INIT, 
      payload: { 
        core: coreModel,
        presentation: {
          mealDetailData: mealResetData,
          showForm: false
        }
      } 
    }, 
    model
  );

  return updatedModel;
}


