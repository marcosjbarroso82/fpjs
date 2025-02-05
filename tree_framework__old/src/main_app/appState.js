
export let appState = {
  "model": {
    "debug_msg": "initialData",
    "data": {
      "accumulator": 7,
      "counter": 5,
      "independentCounter": 55
    },
    "appInternalState": {
      "accumulatorComponent": {
        "accumulator": 7,
        "incrementBy": 1
      },
      "counterComponent": {
        "incrementBy": 2
      },


      "anotherCounterComponent": {
        "incrementBy": 3
      },
      "independentCounterComponent": {
        "incrementBy": 11
      }
    },
    "output": {
      "accumulator": 7,
      "accumulatorIncrementBy": 1,
      "counter": 5,
      "incrementBy": 2,
      "anotherIncrementBy": 3,
      "counterViewStateUpdateDebugTimeStamp": "2025-01-28T15:45:39.717Z",
    }
  },
  "msg": {},
  "nextMsg": {
    "type": "COUNTER_MODEL_INCREMENT",
    "payload": 7
  },
  "executed": true
};

