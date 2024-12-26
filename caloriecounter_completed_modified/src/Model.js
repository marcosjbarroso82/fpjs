export const initCoreModel = {
  
    nextId: 2,
    meals: [
      {
        "id": 1,
        "description": "a",
        "calories": 1
      },
      {
        "id": 2,
        "description": "b",
        "calories": 2
      },
      {
        "id": 3,
        "description": "c",
        "calories": 3
      },
      {
        "id": 4,
        "description": "d",
        "calories": 4
      },
      {
        "id": 5,
        "description": "e",
        "calories": 5
      },
    ]  
};

export const mealResetData = {
  id: null,
  description: '',  
  calories: 0,
};

export const initPresentationModel = {
  mealDetailData: mealResetData,
  showForm: false
};
