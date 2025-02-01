import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);

import { ACC_CTRL_SET_INC_BY, ACC_CTRL_INC, ACC_CTRL_DUMP, APP_OUTPUT_PATH_SEGMENTS_GLOBAL_ACC, APP_OUTPUT_PATH_SEGMENTS_ACC, APP_OUTPUT_PATH_SEGMENTS_ACC_INC_BY } from './constantsAccumulator';
import * as R from 'ramda';

export function renderAccumulatorForm(dispatch, appState) {
    const globalAccumulator = R.path(APP_OUTPUT_PATH_SEGMENTS_GLOBAL_ACC, appState);
    const accumulator = R.path(APP_OUTPUT_PATH_SEGMENTS_ACC, appState);
    const accumulatorIncrementBy = R.path(APP_OUTPUT_PATH_SEGMENTS_ACC_INC_BY, appState);

    return div({}, [
        hr(),
        label({}, `${'Global Accumulator: '} ${globalAccumulator}`),
        br(),
        label({}, `${'Accumulator: '} ${accumulator}`),
        button({ onclick: () => dispatch({ type: ACC_CTRL_DUMP }) }, 'Dump'),
        br(),
        label({}, `${'Accumulator Increment By: '} ${accumulatorIncrementBy}`),
        input({
            type: 'number',
            value: accumulatorIncrementBy,
            oninput: (e) => dispatch({ type: ACC_CTRL_SET_INC_BY, payload: e.target.value })

        }),
        button({ onclick: () => dispatch({ type: ACC_CTRL_INC }) }, 'Increment'),
        hr(),
    ]);
}