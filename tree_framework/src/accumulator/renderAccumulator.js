import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);

import { ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, ACCUMULATOR_CONTROLLER_INCREMENT, ACCUMULATOR_CONTROLLER_DUMP, APP_OUTPUT_PATH_SEGMENTS_GLOBAL_ACCUMULATOR, APP_OUTPUT_PATH_SEGMENTS_ACCUMULATOR, APP_OUTPUT_PATH_SEGMENTS_ACCUMULATOR_INCREMENT_BY } from './constantsAccumulator';
import * as R from 'ramda';

export function renderAccumulatorForm(dispatch, appState) {
    const globalAccumulator = R.path(APP_OUTPUT_PATH_SEGMENTS_GLOBAL_ACCUMULATOR, appState);
    const accumulator = R.path(APP_OUTPUT_PATH_SEGMENTS_ACCUMULATOR, appState);
    const accumulatorIncrementBy = R.path(APP_OUTPUT_PATH_SEGMENTS_ACCUMULATOR_INCREMENT_BY, appState);

    return div({}, [
        hr(),
        label({}, `${'Global Accumulator: '} ${globalAccumulator}`),
        br(),
        label({}, `${'Accumulator: '} ${accumulator}`),
        button({ onclick: () => dispatch({ type: ACCUMULATOR_CONTROLLER_DUMP }) }, 'Dump'),
        br(),
        label({}, `${'Accumulator Increment By: '} ${accumulatorIncrementBy}`),
        input({
            type: 'number',
            value: accumulatorIncrementBy,
            oninput: (e) => dispatch({ type: ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, payload: e.target.value })

        }),
        button({ onclick: () => dispatch({ type: ACCUMULATOR_CONTROLLER_INCREMENT }) }, 'Increment'),
        hr(),
    ]);
}