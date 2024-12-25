import { updatePresentationModel } from './Update';
import { updateCore, CORE_MSGS } from './UpdateCore';
import { MSGS } from './UpdateMsgs';
import { mealResetData } from './Model';

export function UpdatePresentationAddMeal(msg, model) {
  const { description, calories, editId } = model.presentation.mealDetailData;
  const meal = { description, calories, editId };

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

