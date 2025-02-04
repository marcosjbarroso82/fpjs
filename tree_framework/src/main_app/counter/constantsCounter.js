import { APP_DATA_PATH, APP_STATE_PATH, APP_OUTPUT_PATH_SEGMENTS } from '../../framework/constants';
// Constants
const INIT_MSG = 'INIT_MSG';
export const COUNTER_CTRL_SET_INCREMENT_BY = 'COUNTER_CTRL_SET_INCREMENT_BY';
export const ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY = 'ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY';
export const COUNTER_CTRL_INCREMENT = 'COUNTER_CTRL_INCREMENT';
export const ANOTHER_COUNTER_CTRL_INCREMENT = 'ANOTHER_COUNTER_CTRL_INCREMENT';
export const COUNTER_MODEL_INCREMENT = 'COUNTER_MODEL_INCREMENT';
export const INDEPENDENT_COUNTER_CTRL_SET_INCREMENT_BY = 'INDEPENDENT_COUNTER_CTRL_SET_INCREMENT_BY';
export const INDEPENDENT_COUNTER_CTRL_INCREMENT = 'INDEPENDENT_COUNTER_CTRL_INCREMENT';
export const INDEPENDENT_COUNTER_MODEL_INCREMENT = 'INDEPENDENT_COUNTER_MODEL_INCREMENT';

// App Data Paths
export const COUNTER_DATA_PATH = APP_DATA_PATH + '.counter';
export const INDEPENDENT_COUNTER_DATA_PATH = APP_DATA_PATH + '.independentCounter';

// Controller State Paths
export const COUNTER_CTRL_STATE_PATH = `${APP_STATE_PATH}.counterComponent`;
export const COUNTER_CTRL_STATE_PATH_SEGMENTS = COUNTER_CTRL_STATE_PATH.split('.');
export const ANOTHER_COUNTER_CTRL_STATE_PATH = `${APP_STATE_PATH}.anotherCounterComponent`;
export const ANOTHER_COUNTER_CTRL_STATE_PATH_SEGMENTS = ANOTHER_COUNTER_CTRL_STATE_PATH.split('.');
export const INDEPENDENT_COUNTER_CTRL_STATE_PATH = `${APP_STATE_PATH}.independentCounterComponent`;
export const INDEPENDENT_COUNTER_CTRL_STATE_PATH_SEGMENTS = INDEPENDENT_COUNTER_CTRL_STATE_PATH.split('.');

export const COUNTER_CTRL_INCREMENT_BY_PATH = COUNTER_CTRL_STATE_PATH + '.incrementBy';
export const ANOTHER_COUNTER_CTRL_INCREMENT_BY_PATH = ANOTHER_COUNTER_CTRL_STATE_PATH + '.incrementBy';
export const INDEPENDENT_COUNTER_CTRL_INCREMENT_BY_PATH = INDEPENDENT_COUNTER_CTRL_STATE_PATH + '.incrementBy';

// Path Segments
export const COUNTER_DATA_PATH_SEGMENTS = COUNTER_DATA_PATH.split('.');
export const INDEPENDENT_COUNTER_DATA_PATH_SEGMENTS = INDEPENDENT_COUNTER_DATA_PATH.split('.');
export const COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS = COUNTER_CTRL_INCREMENT_BY_PATH.split('.');
export const ANOTHER_COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS = ANOTHER_COUNTER_CTRL_INCREMENT_BY_PATH.split('.');
export const INDEPENDENT_COUNTER_CTRL_INCREMENT_BY_PATH_SEGMENTS = INDEPENDENT_COUNTER_CTRL_INCREMENT_BY_PATH.split('.');

// Output Path Segments
export const APP_OUTPUT_PATH_SEGMENTS_COUNTER = APP_OUTPUT_PATH_SEGMENTS.concat('counter');
export const APP_OUTPUT_PATH_SEGMENTS_INCREMENT_BY = APP_OUTPUT_PATH_SEGMENTS.concat('incrementBy');
export const APP_OUTPUT_PATH_SEGMENTS_ANOTHER_INCREMENT_BY = APP_OUTPUT_PATH_SEGMENTS.concat('anotherIncrementBy');
export const APP_OUTPUT_PATH_SEGMENTS_INDEPENDENT_COUNTER = APP_OUTPUT_PATH_SEGMENTS.concat('independentCounter');
export const APP_OUTPUT_PATH_SEGMENTS_INDEPENDENT_INCREMENT_BY = APP_OUTPUT_PATH_SEGMENTS.concat('independentCounterIncrementBy');


