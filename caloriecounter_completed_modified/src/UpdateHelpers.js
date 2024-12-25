import { updatePresentationModel } from './Update';
import { updateCore, CORE_MSGS } from './UpdateCore';
import { MSGS } from './UpdateMsgs';


export function UpdatePresentationAddMeal(msg, model) {
  const { description, calories } = model.presentation;
  const meal = { description, calories };

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
          // ...model.presentation,
          editId: null,
          description: '',
          calories: 0,
          showForm: false
        }
      }
    }
  );

  return updatedModel;

}

