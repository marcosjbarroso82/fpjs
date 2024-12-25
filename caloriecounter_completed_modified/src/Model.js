export const initCoreModel = {
  
    nextId: 2,
    meals: [
      {
        "id": 1,
        "description": "a",
        "calories": 1
      },
    ]  
};

export const mealResetData = {
  editId: null,
  description: '',  
  calories: 0,
};

export const initPresentationModel = {
  mealDetailData: mealResetData,
  showForm: false
};
