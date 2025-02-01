import { APP_DATA_PATH, APP_OUTPUT_PATH_SEGMENTS, APP_STATE_PATH } from '../constants';

// App Data Paths
export const ACC_VALUE_DATA_PATH = APP_DATA_PATH + '.accumulator';
export const ACC_VALUE_DATA_PATH_SEGMENTS = ACC_VALUE_DATA_PATH.split('.');


// Controller State Paths
export const ACC_CTRL_STATE_PATH = `${APP_STATE_PATH}.accumulatorComponent`;
export const ACC_CTRL_ACC_PATH = ACC_CTRL_STATE_PATH + '.accumulator';
export const ACC_CTRL_ACC_INC_BY_PATH = ACC_CTRL_STATE_PATH + '.incrementBy';

export const ACC_CTRL_ACC_PATH_SEGMENTS = ACC_CTRL_ACC_PATH.split('.');
export const ACC_CTRL_STATE_PATH_SEGMENTS = ACC_CTRL_STATE_PATH.split('.');
export const ACC_CTRL_ACC_INC_BY_DATA_PATH_SEGMENTS = ACC_CTRL_ACC_INC_BY_PATH.split('.');

// Output Paths
export const APP_OUTPUT_PATH_SEGMENTS_GLOBAL_ACC = APP_OUTPUT_PATH_SEGMENTS.concat('globalAccumulator');

export const APP_OUTPUT_PATH_SEGMENTS_ACC = APP_OUTPUT_PATH_SEGMENTS.concat('accumulator');
export const APP_OUTPUT_PATH_SEGMENTS_ACC_INC_BY = APP_OUTPUT_PATH_SEGMENTS.concat('accumulatorIncrementBy');

// Model Msgs
export const ACC_MODEL_INC_MSG = 'ACC_MODEL_INC';
export const ACC_MODEL_INIT_MSG = 'ACC_MODEL_INIT';

// Controller Msgs
export const ACC_CTRL_INC_MSG = 'ACC_CTRL_INC';
export const ACC_CTRL_SET_INC_BY_MSG = 'ACC_CTRL_SET_INC_BY';
export const ACC_CTRL_DUMP_MSG = 'ACC_CTRL_DUMP';
