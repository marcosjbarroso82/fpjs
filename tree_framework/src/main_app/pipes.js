
import { counterViewStateUpdate, anotherCounterViewStateUpdate, independentCounterViewStateUpdate } from './counter/viewCounter';
import { counterControllerStateUpdate, anotherCounterControllerStateUpdate, independentCounterControllerStateUpdate } from './counter/controllerCounter';
import { counterModelStateUpdate } from './counter/modelCounter';
import { accumulatorModelStateUpdate } from './accumulator/modelAccumulator';
import { accumulatorControllerStateUpdate } from './accumulator/controllerAccumulator';
import { accumulatorViewStateUpdate } from './accumulator/viewAccumulator';


export const CONTROLLER_PIPE = [
    counterControllerStateUpdate,
    anotherCounterControllerStateUpdate,
    independentCounterControllerStateUpdate,
    accumulatorControllerStateUpdate
]

export const VIEW_PIPE = [
    counterViewStateUpdate,
    anotherCounterViewStateUpdate,
    independentCounterViewStateUpdate,
    accumulatorViewStateUpdate
]

export const MODEL_PIPE = [
    counterModelStateUpdate,
    accumulatorModelStateUpdate
]